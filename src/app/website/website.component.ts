import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { WhatsappComponent } from "./shared/whatsapp/whatsapp.component";

@Component({
  selector: 'app-website', 
  standalone: true, 
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappComponent],
  templateUrl: './website.component.html',
  styles: [],
  providers: []
})
export class WebsiteComponent implements OnInit {
  public title: string;

  constructor() {
    this.title = 'Website'
  }

  ngOnInit(): void {
    console.log('Website component loaded');
  }
}