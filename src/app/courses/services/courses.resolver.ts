import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { filter, tap, first} from "rxjs/operators";
import { CourseEntityService } from "./courses-entity.service";

@Injectable()
export class CoursesResolver implements Resolve<boolean>{

    constructor(private coursesService: CourseEntityService) {

    }
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {

        return this.coursesService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.coursesService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            )
        //9000/api/courses ngrx-data guess the url based on convention

    }
}