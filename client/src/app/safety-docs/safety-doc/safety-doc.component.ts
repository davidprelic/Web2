import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-safety-doc',
  templateUrl: './safety-doc.component.html',
  styleUrls: ['./safety-doc.component.css']
})
export class SafetyDocComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }
  safetyDocId: number;

  ngOnInit(): void {
    this.safetyDocId = parseInt(this.route.snapshot.params['id']);
  }

}
