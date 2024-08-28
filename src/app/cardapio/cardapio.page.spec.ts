import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Cardapio } from './cardapio.page';

describe('Tab2Page', () => {
  let component: Cardapio;
  let fixture: ComponentFixture<Cardapio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Cardapio],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Cardapio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
