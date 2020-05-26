import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactionViewComponent} from "./components/reaction-view.component";
import {ReactionViewCardComponent} from "./components/reaction-view-card/reaction-view-card.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule} from "@angular/router";
import {ViewModule} from "../view/view.module";


@NgModule({
  declarations: [
    ReactionViewComponent,
    ReactionViewCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    RouterModule,
    ViewModule
  ],
  providers: [],
  exports: [ReactionViewComponent, ReactionViewCardComponent]
})
export class ReactionViewModule {}
