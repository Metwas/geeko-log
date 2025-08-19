/**
     MIT License

     @Copyright (c) Metwas

     Permission is hereby granted, free of charge, to any person obtaining a copy
     of this software and associated documentation files (the "Software"), to deal
     in the Software without restriction, including without limitation the rights
     to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     copies of the Software, and to permit persons to whom the Software is
     furnished to do so, subject to the following conditions:

     The above Copyright notice and this permission notice shall be included in all
     copies or substantial portions of the Software.

     THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     AUTHORS OR Copyright HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     SOFTWARE.
*/

/**
 * Strong-typed styling function
 * 
 * @public
 */
export type Style = ( text: string, options?: LogOptions ) => string;

/**
 * Logger message filter levels
 * 
 * @public
 */
export type LogLevel = "info" | "warn" | "error" | "debug" | "verbose" | "quiet";

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
       level: LogLevel;

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
       key?: string;
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