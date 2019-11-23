import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { GamesComponent } from './games/games.component';
import { BlackjackComponent } from './games/blackjack/blackjack.component';
import { CrazyEightsComponent } from './games/crazy-eights/crazy-eights.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"about",component:AboutComponent},
  {path:"contact",component:ContactComponent},
  {path: 'games', component: GamesComponent},
  {path: 'games/blackjack', component: BlackjackComponent},
  {path: 'games/crazy8s',component: CrazyEightsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
