import { Observable } from "rxjs";

export interface HealthService {
  check(payload: any): Observable<any>
}