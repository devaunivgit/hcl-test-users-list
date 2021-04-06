import { Component, OnInit } from '@angular/core';
import { FilterOption } from './filter-option.interface';
import {UsersService} from '../users.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {group} from '@angular/animations';

class UserData{
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name'
    },
    {
      value: 'username',
      text: 'User Name'
    },
    {
      value: 'email',
      text: 'Email'
    },
    {
      value: 'phone',
      text: 'Phone'
    },
    {
      value: 'website',
      text: 'Website'
    }
  ];

  public userData: UserData[];
  public filterGroup: FormGroup;
  public filterInput: FormControl;
  public selectedType: FormControl;
  public filterValue: UserData[];

  constructor(
    private readonly userService: UsersService,
    private readonly formBuilder: FormBuilder,
  ) {}

  public ngOnInit(): void {
    this.userService.getData().subscribe((response: UserData[]) => {
      this.userData = response;
    });

    this.filterGroup = this.formBuilder.group({
      filterInput: new FormControl('name'),
        selectedType: new FormControl(),
    }
    );


    this.filterInput.valueChanges.subscribe((value) => {
      const selectedType = this.selectedType.value;
      this.filterValue = this.userData.filter((data) => (data[selectedType].indexOf(value) !== -1));
    });
  }

}
