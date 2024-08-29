"use client";

import { datadogRum } from "@datadog/browser-rum";
import { datadogLogs } from "@datadog/browser-logs";

datadogRum.init({
  applicationId: "2c3c8e17-d7ab-40df-8ac3-70fc5aba4ecd",
  clientToken: "pubfc84343e1d0ea85a1e03f64da50ed9b6",
  site: "us5.datadoghq.com",
  service: "vercel-production",
  env: "prod",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",
});

datadogLogs.init({
  clientToken: "pubd790c199def0a2a3cd699e35f6868de4",
  site: "us5.datadoghq.com",
  forwardErrorsToLogs: true,
  sessionSampleRate: 100,
});

datadogRum.startSessionReplayRecording();

export default function DatadogProvider() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
