import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';
import { Subscription } from 'rxjs';
import { OverviewField } from 'src/assets/data/keys/overview-data.keys';
import { AnchorFields } from 'src/assets/data/keys/navbar-data.keys';
import { HeaderField } from 'src/assets/data/keys/header-data.keys';
import { navigatioFields } from 'src/assets/data/keys/navigation-data.keys';
import { dataPageHeaderField } from 'src/assets/data/keys/data-page-header.keys';
import { KeyDataFields } from 'src/assets/data/keys/key-data.keys';
import { childCasesFields } from 'src/assets/data/keys/childCases.keys';
import { vaccinationEffectivenessFields } from 'src/assets/data/keys/VaccinationEffectiveness.keys';
import { deathsField } from 'src/assets/data/keys/deaths.keys';
import { TestingField } from 'src/assets/data/keys/Testing.keys';
import { AdditionalDataField } from 'src/assets/data/keys/AdditionalData.keys';
import { ReinfectionandRecoveryFields } from 'src/assets/data/keys/ReinfectionandRecovery.keys';
import { VaccinationFields } from 'src/assets/data/keys/Vaccination.keys';
import { sharedFields } from 'src/assets/data/keys/shared.keys';
import { SideMenuFields } from 'src/assets/data/keys/sideMenu.keys';
import { hospitalTableFields } from 'src/assets/data/keys/hospitalTable.keys';
import { InternationalEntryFields } from 'src/assets/data/keys/internationalEntry.keys';
import { cityHealthColorsFields } from 'src/assets/data/keys/city-health-colors.keys';
import {subjectLinksFields} from 'src/assets/data/keys/subjectLinks.keys';

@Pipe({
  name: 'LanguagesPipe',
  pure: false
})
export class LanguagesPipe implements PipeTransform {
  private lastValue: string = '';
  private lastKey: string = '';
  private sub?: Subscription;

  constructor(private translationService: TranslationService) {}

  transform(key: any): string {
    let translationKey: string = key;
    const translationPrefixes: [any, string][] = [
    [OverviewField, 'overview'],
    [AnchorFields, 'anchorList'],
    [HeaderField, 'header'],
    [navigatioFields, 'navigation'],
    [dataPageHeaderField, 'dataPageHeader'],
    [KeyDataFields, 'key-data'],
    [childCasesFields, 'ChildCases'],
    [vaccinationEffectivenessFields, 'VaccinationEffectiveness'],
    [deathsField, 'Deaths'],
    [TestingField, 'Testing'],
    [AdditionalDataField, 'AdditionalData'],
    [ReinfectionandRecoveryFields, 'ReinfectionandRecovery'],
    [VaccinationFields, 'Vaccination'],
    [sharedFields, 'shared'],
    [SideMenuFields, 'sideMenu'],
    [hospitalTableFields, 'HospitalTable'],
    [InternationalEntryFields, 'InternationalEntry'],
    [cityHealthColorsFields, 'cityTable'],
    [subjectLinksFields, 'subjectLinks']
    ];

    // טרנספורמציה לפי סוג המפתח
    for (const [enumType, prefix] of translationPrefixes) {
      if (Object.values(enumType).includes(key)) {
        translationKey = `${prefix}.${key}`;
        break;
      }
    }

    if (this.lastKey !== translationKey) {
      this.lastKey = translationKey;
      this.sub?.unsubscribe();
      this.sub = this.translationService
        .getTranslation$(translationKey)
        .subscribe(value => {
          this.lastValue = value;
        });
    }

    return this.lastValue;
  }
}
