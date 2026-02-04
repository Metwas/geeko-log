/**
 * Copyright (c) Metwas
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; version 2 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

/**_-_-_-_-_-_-_-_-_-_-_-_-_- Imports  _-_-_-_-_-_-_-_-_-_-_-_-_-*/

import {
       LogOptions,
       LogLevel,
       Template,
       Style,
       Badge,
} from "../types/LogOptions";

import { format } from "winston";
import chalk from "chalk";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Import log format helper functions
 */
const { combine, timestamp, label, printf } = format;

/**
 * @public
 */
type Brush = {
       [key: string]: chalk.Chalk;
};

/**
 * @public
 * @type {Brush}
 */
const bg_brushes: Brush = {
       verbose: chalk.bgMagentaBright.black.bold,
       debug: chalk.bgBlueBright.black.bold,
       info: chalk.bgGreenBright.black.bold,
       error: chalk.bgRedBright.black.bold,
       warn: chalk.bgYellow.black.bold,
};

/**
 * @public
 * @type {Brush}
 */
const fg_brushes: Brush = {
       verbose: chalk.magentaBright.bold,
       debug: chalk.blueBright.bold,
       info: chalk.greenBright.bold,
       error: chalk.redBright.bold,
       warn: chalk.yellow.bold,
};

/**
 * Default pretty formatter
 *
 * @public
 * @type {Function}
 */
const defaultFormatter: any = printf(
       ({ level, message, label, timestamp }): any => {
              return `${timestamp} [${label}] ${level}: ${message}`;
       },
);

/**
 * Creates a default Winston log formatter
 *
 * @public
 * @param {String} header
 * @returns {Format}
 */
export const createDefaultLogger: any = (header: string) => {
       return combine(label({ label: header }), timestamp(), defaultFormatter);
};

/**
 * Self returning parameter function - echo
 *
 * @public
 * @param {T} value
 * @returns {T}
 */
export function echo<T>(value: T): T {
       return value;
}

/**
 * Helper function for creating a @see string from the provided @see Template interface
 *
 * @public
 * @param {Template} template
 * @returns {String}
 */
export const createTemplateString: any = (
       template: Template,
       artifacts?: any,
): string => {
       const badges: Array<Badge> = template?.badges;

       const length: number = Array.isArray(badges) ? badges.length : 0;
       let index: number = 0;

       let builder: string = "";

       for (; index < length; index++) {
              const badge: string = createBadgeString(badges[index], artifacts);

              if (typeof badge === "string") {
                     builder += badge;
                     builder += " ";
              }
       }

       return builder;
};

/**
 * Helper for creating @see string from the provided @see Badge styling template
 *
 * @public
 * @param {Badge} badge
 * @param {Object} artifacts
 * @returns {String}
 */
export const createBadgeString: any = (
       badge: Badge,
       artifacts?: any,
): string => {
       const styling: Style =
              typeof badge.style === "function" ? badge.style : echo;
       const tag: string = artifacts?.[badge.key] ?? badge.tag ?? "";

       return styling(tag, artifacts);
};

/**
 * Application @see Badge
 *
 * @public
 * @type {Badge}
 */
export const appBadge: Badge = {
       key: "",
       tag: " App ",
       style: (text: string, options?: LogOptions): string => {
              const level: string = options?.level ?? "info";
              const brush: chalk.Chalk = bg_brushes[level];

              return brush(text);
       },
};

/**
 * Process ID application @see Badge
 *
 * @public
 * @type {Badge}
 */
export const processBadge: Badge = {
       key: "process",
       tag: "process",
       style: (text: string, options?: LogOptions): string => {
              return chalk.blackBright(process.pid);
       },
};

/**
 * Padding @see Badge
 *
 * @public
 * @type {Badge}
 */
export const paddingBadge: Badge = {
       key: "pad",
       tag: "",
       style: (text: string, options?: LogOptions): string => {
              const level: string = options?.level ?? "info";
              const brush: chalk.Chalk = bg_brushes[level];

              return brush(" " + text + " ");
       },
};

/**
 * Timestamp artifact to @see Badge
 *
 * @public
 * @type {Badge}
 */
export const timestampBadge: Badge = {
       key: "timestamp",
       style: (text: string, options?: LogOptions): string => {
              return text;
       },
};

/**
 * Message artifact to @see Badge
 *
 * @public
 * @type {Badge}
 */
export const messageBadge: Badge = {
       key: "message",
       style: (text: string, options?: LogOptions) => {
              const level: string = options?.level ?? "info";
              const brush: chalk.Chalk = fg_brushes[level];

              return brush(text);
       },
};

/**
 * Title artifact to @see Badge
 *
 * @public
 * @type {Badge}
 */
export const titleBadge: Badge = {
       key: "label",
       style: (text: string, options?: LogOptions) => {
              const level: string = options?.level ?? "info";
              const brush: chalk.Chalk = bg_brushes[level];

              return brush(text);
       },
};

/**
 * Default application badge template
 *
 * @public
 * @type {Template}
 */
export const appBadgeTemplate: Template = {
       badges: [
              appBadge,
              processBadge,
              timestampBadge,
              titleBadge,
              messageBadge,
       ],
       gap: {
              key: "",
              tag: "",
              style: (text: string, options?: LogOptions) => {
                     return text;
              },
       },
};

/**
 * Default text template
 *
 * @public
 * @type {Template}
 */
export const textTemplate: Template = {
       badges: [messageBadge],
       gap: {
              key: "",
              tag: " ",
              style: (text: string, options?: LogOptions) => {
                     return text;
              },
       },
};

/**
 * Gets the @see LogLevel from the process arguments
 *
 * @public
 * @returns {LogLevel}
 */
export const GET_ARG_LEVEL = (): LogLevel => {
       const args: Array<string> = process.argv.slice(2);
       const verbose: boolean = args.indexOf("--verbose") > -1;
       const debug: boolean = args.indexOf("--debug") > -1;
       const quiet: boolean = args.indexOf("--quiet") > -1;

       let level: LogLevel;

       if (quiet) {
              level = "quiet";
       } else if (debug) {
              level = "debug";
       } else if (verbose) {
              level = "verbose";
       } else {
              level = "info";
       }

       return level;
};
