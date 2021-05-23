import { Component, OnInit } from '@angular/core';
import { FilterOption } from './filter-option.interface';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name',
    },
    {
      value: 'username',
      text: 'User Name',
    },
    {
      value: 'email',
      text: 'Email',
    },
    {
      value: 'phone',
      text: 'Phone',
    },
    {
      value: 'website',
      text: 'Website',
    },
  ];

  searchOption: any = 'username';
  searchKey: any = '';
  results: any;
  actualResults: any;
  constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getUsers().subscribe(
      (data) => {
        if (data.status === 200) {
          this.results = data.body;
          this.actualResults = data.body;
        }
      },
      (error) => {
        //console.log(error);
      }
    );
  }

  applyFilter() {
    this.results = this.actualResults;
    let tempResult = this.results;
    tempResult = tempResult.filter((element) => {
      return element[this.searchOption]
        .toLocaleLowerCase()
        .startsWith(this.searchKey.toLocaleLowerCase());
    });
    if (this.searchKey !== '') {
      this.results = tempResult;
    }
  }
}
