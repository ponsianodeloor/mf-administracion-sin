import { Component } from '@angular/core';
import {
  BillingParametersNotaryTableComponent
} from "../../components/tables/billing-parameters-notary-table/billing-parameters-notary-table.component";

@Component({
  selector: 'app-billing-parameters-notary-page',
  standalone: true,
  imports: [
    BillingParametersNotaryTableComponent
  ],
  templateUrl: './billing-parameters-notary-page.component.html',
  styleUrl: './billing-parameters-notary-page.component.scss'
})
export class BillingParametersNotaryPageComponent {

}
