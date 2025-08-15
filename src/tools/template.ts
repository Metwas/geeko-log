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

/**_-_-_-_-_-_-_-_-_-_-_-_-_- @Imports _-_-_-_-_-_-_-_-_-_-_-_-_-*/

import { Badge, Style, Template } from "../types/LogOptions";

/**_-_-_-_-_-_-_-_-_-_-_-_-_-          _-_-_-_-_-_-_-_-_-_-_-_-_-*/

/**
 * Self returning parameter function - echo
 * 
 * @public
 * @param {T} value 
 * @returns {T}
 */
export function echo<T>( value: T ): T
{
       return value;
};

/**
 * Helper function for creating a @see string from the provided @see Template interface
 * 
 * @public
 * @param {Template} template 
 * @returns {String}
 */
export const createTemplateString: any = ( template: Template, artifacts?: any ): string =>
{
       const badges: Array<Badge> = template?.[ "badges" ];

       const length: number = Array.isArray( badges ) ? badges.length : 0;
       let index: number = 0;

       let builder: string = "";

       for ( ; index < length; index++ )
       {
              const badge: string = createBadgeString( badges[ index ], artifacts );

              if ( typeof badge === "string" )
              {
                     builder += badge + " ";
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
export const createBadgeString: any = ( badge: Badge, artifacts?: any ): string =>
{
       const styling: Style = typeof badge[ "style" ] === "function" ? badge[ "style" ] : echo;
       const tag: string = artifacts?.[ badge[ "key" ] ] || badge[ "tag" ] || "";

       return styling( tag, artifacts );
};