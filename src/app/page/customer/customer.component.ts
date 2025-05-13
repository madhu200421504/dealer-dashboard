import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { Accounts } from '../../model/class/customer';
import { MasterService } from '../../service/master.service';
import {
  AccountsResponse,
  DealerResponse,
  MultiaccountsResponse,
  SingleAccountResponse,
} from '../../model/interface/master';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { dealers } from '../../model/class/dealers';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CalendarModule,
    BreadcrumbModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModalModule,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent implements OnInit {
  // signals for reactive state management
  totalCustomer = signal<number>(0);
  customerList = signal<Accounts[]>([]);
  dealerList = signal<dealers[]>([]);
  // customerObj: accounts = new accounts();

  // service injections
  masterSrv = inject(MasterService);
  private readonly toastr = inject(ToastrService);
  previousEmail: string = '';

  // Form and user management properties
  useForm: FormGroup = new FormGroup({});
  customerObj: Accounts = new Accounts();
  dealerObj: dealers = new dealers();
  isEditMode: boolean = false;

  // For the Edit button blocked
  previousValue: string = '';

  constructor(
    private modalService: NgbModalModule,
    private cdRef: ChangeDetectorRef
  ) {
    this.initializeForm();
  }
  staticDealerList = [
    { dealer_code: 15255 },
    { dealer_code: 56424 },
    { dealer_code: 45252 },
    { dealer_code: 541248 },
  ];

  ngOnInit(): void {
    this.initializeForm();

    this.loadCustomers();
    this.loadDealers();
    this.getAllCustomer();
  }

  isModalVisible = false;

  // Form initialize
  initializeForm() {
    this.useForm = new FormGroup({
      // account_id: new FormControl(''),
      account_type: new FormControl('', [Validators.required]),
      fname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      mobile: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
      ]),
      dealer_code: new FormControl('', [Validators.required]),
    });
  }

  openModal(customer?: Accounts) {
    this.isEditMode = false;

    console.log('hello openmodal', customer); // ✅ Check the customer parameter
    this.useForm.reset(); // ✅ Reset form first
    this.isModalVisible = true;

    // this.isEditMode = !!customer; // ✅ Determine mode

    if (customer) {
      console.log('🚀 Customer Data:', customer); // Debugging log

      this.customerObj = { ...customer };
      this.previousValue = customer.account_name || ''; // ✅ Provide default value
      // ✅ Copy customer data once
      this.useForm.patchValue({
        account_type: customer.account_type || '',
        fname: customer.fname || '',
        lname: customer.lname || '',
        email: customer.email || '',
        phone: customer.phone || '',
        mobile: customer.mobile || '',
        dealer_code: customer.dealer_code || '',
      });
      this.previousEmail = customer.email || '';
      console.log('Edit Mode: Customer Object ->', this.customerObj);
    } else {
      // ✅ Reset customerObj for new entry
      this.customerObj = new Accounts();
      this.customerObj.account_id = ''; // ✅ No need for "any" assertion
      console.log('New Customer Mode: Reset customerObj', this.customerObj);
    }
  }

  closeModal() {
    ($('.bd-example-modal-lg') as any).modal('hide');
    this.isModalVisible = false;
  }

  // edit button hide if the email not changed..!
  isEmailChange(): boolean {
    return this.useForm.value.email !== this.previousValue;
  }

  // loadCustomers() {
  //   this.masterSrv.getAllCustomer().subscribe(
  //     (res: AccountsResponse) => {
  //       console.log('Fetched Accounts:', res); // Log to confirm the data
  //       this.customerList.set(res.data.rows); // Set the data to the signal
  //       this.totalCustomer.set(res.data.count); // Set the total count of customers (using 'count' from the response)
  //     },
  //     (error) => {
  //       console.error('Error fetching customers:', error);
  //       this.toastr.error('Failed to load customers', 'Error'); // Optional: show an error message
  //     }
  //   );
  // }
  loadCustomers() {
    this.masterSrv.getAllCustomer().subscribe(
      (res: AccountsResponse) => {
        console.log('Fetched Accounts:', res); // Log to confirm the data
        this.customerList.set(res.data.rows); // Set the data to the signal
        this.totalCustomer.set(res.data.count); // Set the total count of customers (using 'count' from the response)

        // Additional log to confirm the data update
        // console.log('Updated customerList:', this.customerList);
      },
      (error) => {
        console.error('Error fetching customers:', error);
        this.toastr.error('Failed to load customers', 'Error'); // Optional: show an error message
      }
    );
  }
  getDealerCode(dealerId: string): string {
    const dealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === dealerId
    );
    console.log(this.dealerList);
    return dealer?.dealer_code?.toString() ?? 'N/A';
  }

  onDealerChange() {
    console.log('on dealer chnage func called ');
    console.log('📝 Dealer List:', this.dealerList());

    const selectedDealer = this.dealerList().find(
      (dealer) => dealer.dealer_id === this.customerObj.dealer_id
    );
    console.log('Selected Dealer:', selectedDealer);
    if (selectedDealer) {
      this.customerObj.dealer_code = selectedDealer.dealer_code;
      // Update the form control for dealer_code
      this.useForm.patchValue({
        dealer_code: selectedDealer.dealer_code,
      });
    }
  }
  // onDealerChange() {
  //   console.log('🚀 Dealer ID from customerObj:', this.customerObj.dealer_id);

  //   if (!this.customerObj.dealer_id) {
  //     console.warn('⚠️ Dealer ID is undefined or empty!');
  //     return;
  //   }

  //   const selectedDealer = this.dealerList().find(
  //     (dealer) =>
  //       String(dealer.dealer_id).trim() ===
  //       String(this.customerObj.dealer_id).trim()
  //   );

  //   console.log('✅ Selected Dealer:', selectedDealer);

  //   if (selectedDealer) {
  //     this.customerObj.dealer_code = selectedDealer.dealer_code;
  //     this.useForm.patchValue({
  //       dealer_code: selectedDealer.dealer_code,
  //     });
  //   } else {
  //     console.warn(
  //       '⚠️ No matching dealer found! Check if dealer_id exists in dealerList.'
  //     );
  //     console.log(
  //       '🔎 Searching for:',
  //       this.customerObj.dealer_id,
  //       '🔍 Available dealer_ids:',
  //       this.dealerList().map((d) => d.dealer_id)
  //     );
  //   }
  // }

  loadDealers() {
    this.masterSrv.getAllDealer().subscribe(
      (res: DealerResponse) => {
        this.dealerList.set(res.data.dealer.rows);
        // this.totalDealer.set(res.dealer.count);
        console.log(res);
      },
      (error) => {
        this.toastr.error('Serverside Error', 'Error');
        // alert(error.message);
      }
    );
  }
  // cerate acc
  // createAccounts() {
  //   this.customerObj.phone = Number(this.customerObj.phone);
  //   this.customerObj.mobile = Number(this.customerObj.mobile);
  //   this.masterSrv.createCustomer(this.useForm.value).subscribe(
  //     (res: accounts) => {
  //       this.toastr.success('Account created successfully!', 'Success');
  //       this.loadCustomers();
  //       this.closeModal();
  //     },
  //     (error) => {
  //       this.toastr.error(error.error, 'Error');
  //     }
  //   );
  // }
  createCustomer() {
    console.log('create cust called ');
    console.log('🛠 Submitting customer data:', this.customerObj); // Debugging log

    console.log('🛠 createCustomer() triggered!');

    this.masterSrv.createCustomer(this.customerObj).subscribe(
      (res: Accounts) => {
        this.toastr.success('Customerrr created successfully!', 'Success');
        this.getAllCustomer(); // Reload the dealers list after creation
      },
      (error) => {
        this.toastr.error('Error creating dealer', 'Error');
      }
    );
  }
  // selectedCustomerForDeletion: Accounts | null = null;

  // selectCustomerForDeletion(accounts: Accounts) {
  //   this.selectedCustomerForDeletion = accounts;
  //   console.log(
  //     'Selected vehicle for deletion:',
  //     this.selectedCustomerForDeletion
  //   );
  // }
  selectedCustomerForDeletion: Accounts | null = null;

  selectCustomerForDeletion(account: Accounts) {
    this.selectedCustomerForDeletion = account;
  }

  // deleteCustomerId() {
  //   if (
  //     this.selectedCustomerForDeletion &&
  //     this.selectedCustomerForDeletion.account_id
  //   ) {
  //     this.masterSrv
  //       .deleteCustomer(this.selectedCustomerForDeletion.account_id)
  //       .subscribe(
  //         (res: AccountsResponse) => {
  //           this.loadDealers();
  //           this.loadCustomers();
  //           // this.closeModal();
  //         },
  //         (error) => {
  //           console.error('Delete vehicle error:', error);
  //           alert(error.message || 'Failed to delete vehicle');
  //         }
  //       );
  //   } else {
  //     alert('No vehicle selected for deletion');
  //   }
  // }

  // onUpdate() {
  //   if (this.useForm.invalid) {
  //     this.markFormGroupTouched(this.useForm);
  //     this.toastr.warning(
  //       'Please fill all required fields correctly',
  //       'Validation'
  //     );
  //     return;
  //   }

  //   this.masterSrv.updateCustomer(this.useForm.value).subscribe({
  //     next: () => {
  //       this.toastr.success('Account Update successfully!', 'Success');
  //       this.loadCustomers();
  //       this.closeModal();
  //     },
  //     error: (err) => {
  //       console.error('User update error:', err);
  //       this.toastr.error('Server Error', 'Error');
  //       // alert('something happn ');
  //     },
  //   });
  // }
  // acc update
  // component.ts
  // onUpdate() {
  //   this.masterSrv.updateCustomer(this.customerObj).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res); // Log the response to check the structure
  //       // If the response structure matches `MultiaccountsResponse`, update your type
  //       this.toastr.success('Customer updated successfully', 'Success');
  //       this.loadCustomers();
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating customer', 'Error');
  //       console.error(error);
  //     }
  //   );
  // }
  // onUpdate() {
  //   if (!this.customerObj || !this.customerObj.account_id) {
  //     this.toastr.warning('No customer selected for update!', 'Warning');
  //     console.error('Update failed: Missing customer ID', this.customerObj);
  //     return;
  //   }

  //   console.log('Updating Customer:', this.customerObj); // ✅ Log before update

  //   this.masterSrv.updateCustomer(this.customerObj).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res); // ✅ Log API response

  //       if (res && res.status === 200) {
  //         this.toastr.success(
  //           res.message || 'Customer updated successfully',
  //           'Success'
  //         );

  //         // ✅ Manually reload customers after update
  //         this.loadCustomers();

  //         // ✅ Close the modal after updating
  //         this.closeModal();
  //       } else {
  //         this.toastr.warning('Update failed, check data.', 'Warning');
  //       }
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating customer', 'Error');
  //       console.error('Update error:', error);
  //     }
  //   );
  // }
  // onUpdate() {
  //   this.masterSrv.updateCustomer(this.customerObj).subscribe(
  //     (res: any) => {
  //       this.toastr.success('Customer updated successfully!', 'Success');
  //       // this.loadCustomers();
  //       this.loadCustomers();
  //       // this.getAllCustomer();
  //       this.closeModal();
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating Customer', 'Error');
  //     }
  //   );
  // }
  // onUpdate() {
  //   this.masterSrv.updateCustomer(this.customerObj).subscribe(
  //     (res: any) => {
  //       this.toastr.success('Customer updated successfully!', 'Success');

  //       // After updating, refresh the customer list
  //       this.getAllCustomer();
  //       // Optional: Log the updated response to verify success
  //       console.log('Update Response:', res);

  //       // Close modal after update
  //       this.closeModal();
  //     },
  //     (error) => {
  //       this.toastr.error('Error updating Customer', 'Error');
  //       console.error('Update Error:', error);
  //     }
  //   );
  // }
  deleteCustomerId() {
    console.log(
      'this is the select user',
      this.selectCustomerForDeletion,
      this.selectedCustomerForDeletion
    );
    if (
      this.selectedCustomerForDeletion &&
      this.selectedCustomerForDeletion.account_id
    ) {
      this.masterSrv
        .deleteCustomer(this.selectedCustomerForDeletion.account_id)
        .subscribe(
          (res: AccountsResponse) => {
            this.toastr.success('Accounts deleted successfully', 'Success');
            this.getAllCustomer();

            // ✅ Modal cleanup code
            $('#deleteModal').modal('hide');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
          },
          (error) => {
            this.toastr.error('Server Error', 'Error');
          }
        );
    } else {
      alert('No accounts selected for deletion');
    }
  }

  onUpdate() {
    console.log('onupdate called ');
    if (this.useForm.valid) {
      this.customerObj = { ...this.customerObj, ...this.useForm.value };

      console.log('🚀 Updated Payload before API call:', this.customerObj);

      this.masterSrv.updateCustomer(this.customerObj).subscribe(
        (res: any) => {
          console.log('✅ API Response:', res); // ✅ Check API response

          if (res.status === 200) {
            this.toastr.success(res.message, 'Success');

            // 🔄 Ensure we fetch updated data after updating
            setTimeout(() => {
              this.getAllCustomer();
            }, 500);
          } else {
            this.toastr.error('Update failed, no data received', 'Error');
          }
        },
        (error) => {
          console.error('❌ API Error:', error);
          this.toastr.error('Failed to update customer', 'Error');
        }
      );
    } else {
      this.toastr.error('Invalid form data. Please check inputs.', 'Error');
    }
  }

  getAllCustomer() {
    // debugger;
    this.masterSrv.getAllCustomer().subscribe(
      (res: AccountsResponse) => {
        console.log('Fetched Customers:', res); // Check if updated data is fetched

        console.log('customer list updated:', res.data.rows); // Log response to verify

        this.customerList.set(res.data.rows); // Set the dealer list
        this.totalCustomer.set(res.data.count);
      },
      (error) => {
        this.toastr.error('Error fetching dealers', 'Error');
      }
    );
  }

  // getAllCustomer() {
  //   debugger;
  //   this.masterSrv.getAllDealer().subscribe(
  //     (res: DealerResponse) => {
  //       console.log('Dealer list updated:', res.data.dealer.rows); // Log response to verify
  //       this.dealerList.set(res.data.dealer.rows); // Set the dealer list
  //       this.totalDealer.set(res.data.dealer.count);
  //     },
  //     (error) => {
  //       this.toastr.error('Error fetching dealers', 'Error');
  //     }
  //   );
  // }
  // onEdit(id: string) {
  //   this.masterSrv.getSingleAccount(id).subscribe({
  //     next: (res: Accounts) => {
  //       console.log('Fetched customer for edit:', res); // Log to verify fetched customer data

  //       this.customerObj = res;
  //       this.openModal(res);
  //     },
  //     error: (err) => {
  //       console.error('User fetch error:', err);
  //       this.toastr.error('Failed to fetch user details', 'Error');
  //     },
  //   });
  // }
  // onEdit(customer: Accounts) {
  //   // const nameParts = customer.account_name && customer.account_name.trim() ? customer.account_name.split(' ') : [];
  //   this.isEditMode = true; // Ensure edit mode is set
  //   console.log('customer.account_id before setting:', customer?.account_id);
  //   this.customerObj = { ...customer }; // Spread operator to ensure reference is copied

  //   this.useForm.patchValue({
  //     account_type: customer.account_type || '',
  //     fname: customer.fname || '',
  //     lname: customer.lname || '',
  //     email: customer.email || '',
  //     phone: customer.phone || '',
  //     mobile: customer.mobile || '',
  //     dealer_code: customer.dealer_code || '', // Ensure only set once
  //     account_id: customer.account_id || ' ',
  //   });
  //   console.log(this.dealerObj, 'trueeee----');

  //   console.log(
  //     'customerObj.account_id after setting:',
  //     this.customerObj?.account_id
  //   );
  // }

  onEdit(account_id: string) {
    console.log('Edit button clicked. Dealer ID:', account_id);
    this.isEditMode = true;

    this.masterSrv.getCustomerById(account_id).subscribe(
      (res: SingleAccountResponse) => {
        console.log('API Response:', res);

        if (res?.data) {
          const customer: Accounts = res.data; // ✅ Correct: `res.data` is already the customer object

          // ✅ Store dealer_code safely in your model
          this.customerObj = {
            ...customer,
            dealer_code: Number(customer.dealer_code),
          };

          // ✅ Patch the form
          this.useForm.patchValue({
            dealer_code: Number(customer.dealer_code),
            dealer_name: customer.account_name || '',
            account_type: customer.account_type || '',
            fname: customer.fname || '',
            lname: customer.lname || '',
            email: customer.email || '',
            phone: customer.phone || '',
            mobile: customer.mobile || '',
            account_id: customer.account_id || '',
          });

          console.log('Dealer data set, opening modal...');

          // ✅ Ensure modal opens
          setTimeout(() => {
            ($(`#exampleModalCenter`) as any).modal('show');
          }, 0);
        } else {
          console.error('Dealer data is missing in response:', res);
          this.toastr.error('Dealer data not found', 'Error');
        }
      },
      (error: any) => {
        console.error('Error fetching dealer details:', error);
        this.toastr.error('Error fetching dealer details', 'Error');
      }
    );
  }

  isCustomerNameChanged(): boolean {
    return this.useForm.value.name !== this.previousValue;
  }

  // onSave() {
  //   if (this.useForm.invalid) {
  //     console.log('form is invalid', this.useForm);
  //     this.useForm.markAllAsTouched();
  //     return;
  //   }

  //   this.createAccounts();
  //   ($('.bd-example-modal-lg') as any).modal('hide');
  //   console.log('form is valid');
  // }

  // private markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach((control) => {
  //     control.markAsTouched();

  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });ss
  // }
  onSave() {
    if (this.useForm.invalid) {
      this.useForm.markAllAsTouched();
      this.toastr.warning(
        'Please fill all required fields correctly',
        'Validation'
      ); // Mark all fields as touched
      return; // Don't proceed if the form is invalid
    }
    console.log('📦 Payload Before API Call:', this.useForm.value);

    const formData = this.useForm.value;
    console.log('Form Data being sent to API:', formData);
    this.masterSrv.createCustomer(formData).subscribe({
      next: () => {
        this.toastr.success('Accounts created successfully!', 'Success');
        this.getAllCustomer();
        this.closeModal();
      },
      error: (err) => {
        console.error('Accounts creation error:', err);
        this.toastr.error(
          err.message || 'Failed to create user',
          'Creation Error'
        );
      },
    });
  }
  // Proceed with creating or updating the dealer based on the mode
  //   if (this.isEditMode) {
  //     this.onUpdate(); // Update existing dealer
  //   } else {
  //     this.createNewCustomer(); // Create new dealer
  //   }

  //   this.closeModal();
  // }

  createNewCustomer() {
    // this.customerObj.email = String(this.customerObj.email || '').trim();

    this.masterSrv.createCustomer(this.customerObj).subscribe(
      (res: Accounts) => {
        this.toastr.success('customer created successfully!', 'Success');
        this.getAllCustomer(); // Reload the dealers list after creation
      },
      (error) => {
        this.toastr.error('Error creating dealer', 'Error');
      }
    );
  }
}
