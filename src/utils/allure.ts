import * as allure from 'allure-js-commons';

export interface TestMetadata {
  epic: string;
  feature: string;
  story: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  tags?: string[];
}

export async function setTestMetadata(metadata: TestMetadata): Promise<void> {
  await allure.epic(metadata.epic);
  await allure.feature(metadata.feature);
  await allure.story(metadata.story);

  if (metadata.severity) {
    await allure.severity(metadata.severity);
  }

  for (const tag of metadata.tags ?? []) {
    await allure.tag(tag);
  }
}
