import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormComponent } from '../user-form/user-form.component';
import { GraphqlService } from '../../services/graphql.service';
import { DocumentationService } from '../../services/documentation.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  loading = true;
  activeTab = 'frontend';

  constructor(
    private graphqlService: GraphqlService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public docs: DocumentationService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.graphqlService.getAllUsers().subscribe({
      next: ({ data }) => {
        this.users = data.getAllUsers;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.snackBar.open('Failed to load users', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.docs.openDocumentation(tab);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.graphqlService.createUser(result).subscribe({
          next: () => {
            this.loadUsers();
            this.snackBar.open('User created successfully', 'Close', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Error creating user:', error);
            const message = error.message.includes('already exists')
              ? error.message
              : 'Failed to create user';
            this.snackBar.open(message, 'Close', { duration: 3000 });
          },
        });
      }
    });
  }

  openEditDialog(user: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode: 'edit', user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.graphqlService
          .updateUser({
            id: user.id,
            ...result,
          })
          .subscribe({
            next: () => {
              this.loadUsers();
              this.snackBar.open('User updated successfully', 'Close', {
                duration: 3000,
              });
            },
            error: (error) => {
              console.error('Error updating user:', error);
              const message = error.message.includes('already exists')
                ? error.message
                : 'Failed to update user';
              this.snackBar.open(message, 'Close', { duration: 3000 });
            },
          });
      }
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.graphqlService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user.id !== id);
          this.snackBar.open('User deleted successfully', 'Close', {
            duration: 3000,
          });
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete user', 'Close', {
            duration: 3000,
          });
        },
      });
    }
  }
}
