import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AlertService, UserService } from '@app/_services';
@Component({
    templateUrl: 'list.component.html',
    styleUrls: ['list.component.css']
})
export class ListComponent implements OnInit {
    users: any[] = [];
    filteredUsers: any[] = [];
    searchQuery: string = '';

    constructor(private userService: UserService,private alertService: AlertService) {}

    ngOnInit() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => {
                this.users = users;
                this.filteredUsers = users;  // Initialize filteredUsers
            });
    }

    // Method to filter users based on the search query
    filterUsers(event: any) {
        const query = event.target.value.toLowerCase();  // Extract the input value

        this.filteredUsers = this.users.filter(user =>
            `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
    }


    // deleteUser(id: string) {
    //     const user = this.users.find(x => x.id === id);
    //     user.isDeleting = true;
    //     this.userService.delete(id)
    //         .pipe(first())
    //         .subscribe(() => {
    //             this.users = this.users.filter(x => x.id !== id);
    //             this.filterUsers({ target: { value: this.searchQuery }});  // Re-filter after deletion
    //         });
    // }
    deleteUser(id: string) {
      const user = this.users.find(x => x.id === id);
      user.isDeleting = true;

      this.userService.delete(id)
          .pipe(first())
          .subscribe({
              next: () => {
                  // Remove the deleted user from the users array
                  this.users = this.users.filter(x => x.id !== id);

                  // Re-filter after deletion
                  this.filterUsers({ target: { value: this.searchQuery } });

                  // Show success message using AlertService
                  this.alertService.success('User deleted successfully!', { keepAfterRouteChange: true });
              },
              error: error => {
                  this.alertService.error(error);
              }
          });
  }

}
