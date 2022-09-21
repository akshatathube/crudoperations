import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postemployee(data:any)
  {
    return this.http.post<any>("http://localhost:3000/employeelist/",data).pipe(map((res:any)=>{
      return res;
  }))
}
getemployees()
{
  return this.http.get<any>("http://localhost:3000/employeelist/").pipe(map((res:any)=>{
    return res;
}))
}
updateemployee(data:any,id:number)
{
  return this.http.put<any>("http://localhost:3000/employeelist/"+id,data).pipe(map((res:any)=>{
    return res;
}))
}
deleteemployee(id:number)
{
  return this.http.delete<any>("http://localhost:3000/employeelist/"+id).pipe(map((res:any)=>{
    return res;
}))
}
}
