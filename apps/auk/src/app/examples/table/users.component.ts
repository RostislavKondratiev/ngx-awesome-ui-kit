import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UsersDatabase } from './users.database';
import { UsersDatasource } from './users.datasource';
import { AukTable } from '@auk/table';

@Component({
  selector: 'auk-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersDatabase]
})
export class UsersComponent implements OnInit, AfterViewInit {

  public dataSource: UsersDatasource;
  public columns = ['name', 'department', 'role', 'email'];
  @ViewChild(AukTable) table: AukTable<any>;

  constructor(private db: UsersDatabase) {
    this.dataSource = new UsersDatasource(this.db);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.table);
  }

}
