import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeModel } from '../employee';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
 /// dtOptions: DataTables.Settings = {};
   formValue!: FormGroup;
   EmployeeModelObj:EmployeeModel=new EmployeeModel;
   employeeData!:any;
  constructor(private formbuilder:FormBuilder, private api:ApiService) { }
 
  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
   this.formValue=this.formbuilder.group({
    fname:[''],
    lname:[''],
    eid:[''],
    jtitle:[''],
    salary:[''],
    email:[''],
    city:[''],
    skill:[''],
   })
   this.getAllemployees()
  }
 postEmployeeDetails()//done post api
 {
  this.EmployeeModelObj.fname = this.formValue.value.fname;
  this.EmployeeModelObj.lname = this.formValue.value.lname;
  this.EmployeeModelObj.eid = this.formValue.value.eid;
  this.EmployeeModelObj.jtitle = this.formValue.value.jtitle;
  this.EmployeeModelObj.salary = this.formValue.value.salary;
  this.EmployeeModelObj.email = this.formValue.value.email;
  this.EmployeeModelObj.city = this.formValue.value.city;
  this.EmployeeModelObj.skill = this.formValue.value.skill;

  this.api.postemployee(this.EmployeeModelObj).subscribe(res=>{
    console.log(res);
    alert("user added successfully")
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    //this.getAllemployees()//for instance update data
  },
  err=>{
    alert("something went wrong, please check again")
  })
 }

 getAllemployees(){ //get api done
  this.api.getemployees().subscribe(res=>{
    this.employeeData=res;
  })
 }
 deleteemployee(emp:any)
 {
  this.api.deleteemployee(emp.id).subscribe(res=>{
    alert("user deleted successfuly")
    this.getAllemployees()
  })
 }
 onEdit(emp:any)
{
  this.EmployeeModelObj.id = emp.id;
 this.formValue.controls['fname'].setValue(emp.fname);
 this.formValue.controls['lname'].setValue(emp.lname);
 this.formValue.controls['eid'].setValue(emp.eid);
 this.formValue.controls['jtitle'].setValue(emp.jtitle);
 this.formValue.controls['salary'].setValue(emp.salary);
 this.formValue.controls['email'].setValue(emp.email);
 this.formValue.controls['city'].setValue(emp.city);
 this.formValue.controls['skill'].setValue(emp.skill);
}
updateEmployeeDetails()
{
  this.EmployeeModelObj.fname = this.formValue.value.fname;
  this.EmployeeModelObj.lname = this.formValue.value.lname;
  this.EmployeeModelObj.eid = this.formValue.value.eid;
  this.EmployeeModelObj.jtitle = this.formValue.value.jtitle;
  this.EmployeeModelObj.salary = this.formValue.value.salary;
  this.EmployeeModelObj.email = this.formValue.value.email;
  this.EmployeeModelObj.city = this.formValue.value.city;
  this.EmployeeModelObj.skill = this.formValue.value.skill;

  this.api.updateemployee(this.EmployeeModelObj, this.EmployeeModelObj.id).subscribe(res=>{
    alert("user updated successfully!")
    let ref=document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllemployees()//for instance update data
  })
}
}
