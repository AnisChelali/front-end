import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {}

  onSignup(){
    this.router.navigate(['signup'], {relativeTo : this.route})
  }
  onLogin(){
    this.router.navigate(['login'], {relativeTo : this.route})
  }

}
