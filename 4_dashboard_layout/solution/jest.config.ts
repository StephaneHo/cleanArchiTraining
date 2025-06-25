import type { Config } from "jest";

export default async (): Promise<Config> => {
  return {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      customExportConditions: [""],
    },
    transform: {
      "^.+\\.(js|ts|tsx)$": "ts-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
      uuid: require.resolve("uuid"),
      "\\.(avif|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
        "jest-transform-stub",
      //TODo,
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    setupFiles: ["<rootDir>/jest.polyfills.js"],
  };
};
