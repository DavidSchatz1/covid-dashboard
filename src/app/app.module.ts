import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LanguagesPipe } from './shared/pipes/languages.pipe';
import { NavbarComponent } from './layout/navbar/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OverviewCardComponent } from './dashboard/overview/components/overview-card/overview-card.component';
import { OverviewMainComponent } from './dashboard/overview/components/overview-main/overview-main.component';
import { NumericDataPipe } from './shared/pipes/numeric-data.pipe';
import { HeaderComponent } from './layout/header/header/header.component';
import { SevenDaySummaryComponent } from './dashboard/overview/components/seven-day-summary/seven-day-summary.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { DataPageHeaderComponent } from './layout/data-page-header/data-page-header.component';
import { KeyDataComponent } from './dashboard/sections/key-data/key-data.component';
import { ChildCasesSectionComponent } from './dashboard/sections/child-cases-section/child-cases-section.component';
import { VaccinationEffectivenessSectionComponent } from './dashboard/sections/vaccination-effectiveness-section/vaccination-effectiveness-section.component';
import { DeathsSectionComponent } from './dashboard/sections/deaths-section/deaths-section.component';
import { TestingSectionComponent } from './dashboard/sections/testing-section/testing-section.component';
import { AdditionalDataSectionComponent } from './dashboard/sections/additional-data-section/additional-data-section.component';
import { ReinfectionandRecoverySectionComponent } from './dashboard/sections/reinfectionand-recovery-section/reinfectionand-recovery-section.component';
import { VaccinationSectionComponent } from './dashboard/sections/vaccination-section/vaccination-section.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { InfoIconComponent } from './shared/components/info-icon/info-icon.component';
import { MoreMenuComponent } from './shared/components/more-menu/more-menu.component';
import { RangeSelectorComponent } from './shared/components/range-selector/range-selector.component';
import { DeathsChartComponent } from './dashboard/charts/deaths-chart/deaths-chart.component';
import { LoadingLineComponent } from './layout/loading-line/loading-line.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { HospitalOccupancyTableComponent } from './dashboard/tables/hospitals-table/hospital-occupancy-table/hospital-occupancy-table.component';
import { HospitalFilterComponent } from './dashboard/tables/hospitals-table/hospital-filter/hospital-filter.component';
import { InternationalEntryComponent } from './dashboard/tables/entry-table/international-entry/international-entry.component';
import { EntryFilterComponent } from './dashboard/tables/entry-table/international-entry/entry-filter/entry-filter.component';
import { CitiesColorsComponent } from './dashboard/tables/city-colors/cities-colors/cities-colors.component';
import { CityFilterComponent } from './dashboard/tables/city-colors/city-filter/city-filter.component';
import { SubjectLinksComponent } from './shared/components/subject-links/subject-links.component';
import { EmptyCardComponent } from './shared/components/empty-card/empty-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LanguagesPipe,
    NavbarComponent,
    OverviewCardComponent,
    OverviewMainComponent,
    NumericDataPipe,
    HeaderComponent,
    SevenDaySummaryComponent,
    NavigationComponent,
    DataPageHeaderComponent,
    KeyDataComponent,
    ChildCasesSectionComponent,
    VaccinationEffectivenessSectionComponent,
    DeathsSectionComponent,
    TestingSectionComponent,
    AdditionalDataSectionComponent,
    ReinfectionandRecoverySectionComponent,
    VaccinationSectionComponent,
    InfoIconComponent,
    MoreMenuComponent,
    RangeSelectorComponent,
    DeathsChartComponent,
    LoadingLineComponent,
    SideMenuComponent,
    HospitalOccupancyTableComponent,
    HospitalFilterComponent,
    InternationalEntryComponent,
    EntryFilterComponent,
    CitiesColorsComponent,
    CityFilterComponent,
    SubjectLinksComponent,
    EmptyCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
     BrowserAnimationsModule,  
     FormsModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
