/**
 * @ngdoc directive
 * @name Hold Tag External  Component
 * @element Input labels 
 * @function 
 * Preview pictures and document,
 * Check if image is set,
 * Get Documents from the html,
 * Validate MIME type.
 * @description
 * Hold Tag External component shows the various labels to submit the Internal tag form
 * 
 * ---------------Functions--------------
 * API call for getting the Process List, Machine List,
 * Get Selected Process , Get Selected Machine,
 * Clear Selected Process, Clear Selected Machine
 **/
import { Component, OnInit } from '@angular/core';
import {UtilityServiceService} from 'src/app/Service/utility-service.service';
import {ProcessStep} from 'src/app/Model/processStep';
import {MachineStep} from 'src/app/Model/machine';
import { RestAPIService } from 'src/app/Service/restAPIService/rest-apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hold-tag-external',
  templateUrl: './hold-tag-external.component.html',
  styleUrls: ['./hold-tag-external.component.css']
})
export class HoldTagExternalComponent implements OnInit {
  public externalTagData;
  partNumId = 'id';
  processKeyword='Department';
  machineKeyword1='MachineDesc';
  public processStep:ProcessStep[];
  public machineStep:MachineStep[];
  public processStepId: string;
  public machineStepId: string;
  public selectedProcessStep:string="";
  public selectedMachine:string="";


  constructor(private utilityService:UtilityServiceService , 
              private restAPIService: RestAPIService,
              private router: Router) { }
 ngOnInit() {
  this.externalTagData = this.utilityService.getTagData();
  this.getProcessList();
    this.getMachineList();
    if(this.externalTagData.ProcessStep){
      this.selectedProcessStep=this.externalTagData.ProcessStep;
    }if(this.externalTagData.MachineID){
      this.selectedMachine=this.externalTagData.MachineID+ " " + this.externalTagData.MachineDesc;
      console.log("machine",this.selectedMachine);
    }
  }
// moved to login screen
moveToLoginScreen(){
  this.router.navigate(['/login']);
}

focusOutFunction($event) {
  var val = (<HTMLInputElement>document.getElementById("issuedByValue")).value;
  this.externalTagData.textIssuedBy = val;
  this.utilityService.setTagData(this.externalTagData);
}

  //event handler to get the selected value of process step
  getSelectedProcessStep(event) {    
    this.externalTagData.ProcessStep = event.Department;
   this.selectedProcessStep=event.Department;
   console.log(this.selectedProcessStep);
    this.utilityService.setTagData(this.externalTagData);
  }
   //event handler to get the selected value of machine step
   getSelectedMachine(event: any) {
    this.externalTagData.MachineID = event.id;
    this.externalTagData.MachineDesc=event.MachineDesc;
    this.selectedMachine = event.id + " "+ event.MachineDesc;
    this.utilityService.setTagData(this.externalTagData);
  }

  
// get processList
getProcessList() {
  this.restAPIService.getProcessList().subscribe(
    (data: any) => {      
      this.processStep=data;
      this.utilityService.setProcessList(data);
    },error=>{
      if(error.status==401){
        console.log("error",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
     }
  )
}


// get machineList
getMachineList() {
  this.restAPIService.getMachineList().subscribe(
    (data: any) => {
      this.machineStep=data;
      this.utilityService.setMachineList(data);
    },error=>{
      if(error.status==401){
        console.log("error",error.error.error);
        var errorMessage=error.error.error;     
        this.restAPIService.setApiErrorResponse(errorMessage);
        this. moveToLoginScreen();
       }   
     }
  )
} 

// clear calls in auto complete
clearProcessData(){
  this.externalTagData.ProcessStep = '';
}

clearMachineData(){
  this.externalTagData.MachineID = '';
}
}
