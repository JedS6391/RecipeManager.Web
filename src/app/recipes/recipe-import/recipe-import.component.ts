import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Observable, BehaviorSubject, timer, throwError } from 'rxjs';
import { RecipesCreateFacade } from '../store/recipes-store.facade';
import { MessagingService } from 'src/app/shared/messaging.service';
import { filter, take, withLatestFrom, map, switchMap, timeout, catchError, timeoutWith } from 'rxjs/operators';
import { RecipeImportJob, RecipeImportJobStatus } from '../api/models/read/recipe-import-job.interface';
import { ErrorService } from 'src/app/shared/error.service';

const urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

@Component({
  selector: 'app-recipe-import',
  templateUrl: './recipe-import.component.html',
  styleUrls: ['./recipe-import.component.scss']
})
export class RecipeImportComponent implements OnInit {
  public form: FormGroup;

  public recipeImportJob$: Observable<RecipeImportJob>;
  public jobRunning$: BehaviorSubject<boolean>;

  public isLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private recipesCreateFacade: RecipesCreateFacade,
    private messagingService: MessagingService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      url: ['', Validators.compose([Validators.required, Validators.pattern(urlRegex)])]
    });

    this.jobRunning$ = new BehaviorSubject(false);
    this.isLoading$ = this.recipesCreateFacade.isLoading();
  }

  public submitForm(): void {
    if (!this.form.valid) {
      this.messagingService.showMessage('Please enter the required details.', {
        duration: 2000
      });

      return;
    }

    this.importRecipe(error => {
      this.errorService.recordError(error);

      this.jobRunning$.next(false);

      this.messagingService.showMessage('Import was aborted as it did not complete within 60 seconds.', {
        duration: 4000
      });
    });
  }

  private importRecipe(statusPollerErrorHandler: (error: Error) => void) {
      this.recipesCreateFacade.importRecipe({
        recipeUrl: this.form.value.url
      });

      this.recipesCreateFacade.isLoading().pipe(
        filter(isLoading => !isLoading),
        withLatestFrom(this.recipesCreateFacade.getRecipeImportJob()),
        take(1)
      ).subscribe(([, job]) => {
        this.recipeImportJob$ = this.recipesCreateFacade.getRecipeImportJob();

        this.jobRunning$.next(true);

        this.form.disable();

        this.messagingService.showMessage('Waiting for import to complete...', {
          duration: 4000
        });

        const jobStatusPoller = this.getJobStatusPoller(job);

        jobStatusPoller.subscribe(
          () => {},
          statusPollerErrorHandler
        );
      });
  }

  private getJobStatusPoller(job: RecipeImportJob) {
    // Poll for the job status every 2 seconds.
    return timer(0, 2000).pipe(
      map(() => this.recipesCreateFacade.fetchRecipeImportJob(job.id)),
      switchMap(() => this.recipesCreateFacade.getRecipeImportJob()),
      filter(j => j.status === RecipeImportJobStatus.Completed),
      // As soon as the job completes we want to get the result.
      take(1),
      map(j => {
        this.jobRunning$.next(false);

        this.messagingService.showMessage('Recipe successfully imported!', {
          duration: 4000
        });

        this.router.navigate([`recipes/edit/${j.importedRecipe.id}`]);
      }),
      timeout(60000)
    );
  }
}
