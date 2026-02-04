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

/**
 * Strong-typed styling function
 *
 * @public
 */
export type Style = (text: string, options?: LogOptions) => string;

/**
 * Logger message filter levels
 *
 * @public
 */
export type LogLevel =
       | "info"
       | "warn"
       | "error"
       | "debug"
       | "verbose"
       | "quiet";

/**
 * Log artifact options
 *
 * @public
 */
export type LogOptions = {
       /**
        * Log level, e.g: error, debug, info
        *
        * @public
        * @type {LogLevel}
        */
       level?: LogLevel;

       /**
        * Log custom label/tag
        *
        * @public
        * @type {String}
        */
       label?: string;

       /**
        * Log styling @see Template
        *
        * @public
        * @type {Template}
        */
       template?: Template;
};

export type LogOutput = {
       marker?: string;
       load?: boolean;
};

/**
 * Log styling template
 *
 * @public
 */
export type Badge = {
       /**
        * Main style process function
        *
        * @public
        * @type {Style}
        */
       style: Style;

       /**
        * Template tag/text value
        *
        * @public
        * @type {String}
        */
       tag?: string;

       /**
        * Lookup key for the template builder to apply
        *
        * @public
        * @type {String}
        */
       key: string;
};

/**
 * Log metadata template definitions
 *
 * @public
 */
export type Template = {
       /**
        * Accent color
        *
        * @public
        * @type {String}
        */
       accent?: string;

       /**
        * Artifact table which can hold keys for consuming during the building stages
        *
        * @public
        * @type {Object}
        */
       artifacts?: any;

       /**
        * Template badges & styling
        *
        * @public
        * @type {Array<Badge>}
        */
       badges: Array<Badge>;

       /**
        * Gap styling between each @see badges
        *
        * @public
        * @type {Badge}
        */
       gap: Badge;
};
