/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isMostlySafeCast = require( '@stdlib/array-base-assert-is-mostly-safe-data-type-cast' );
var isRealDataType = require( '@stdlib/array-base-assert-is-real-data-type' );
var isComplexDataType = require( '@stdlib/array-base-assert-is-complex-floating-point-data-type' );
var isCollection = require( '@stdlib/assert-is-collection' );
var base = require( '@stdlib/array-base-mskput' );
var dtype = require( '@stdlib/array-dtype' );
var convert = require( '@stdlib/array-convert' );
var format = require( '@stdlib/string-format' );
var defaults = require( './defaults.js' );
var validate = require( './validate.js' );


// MAIN //

/**
* Replaces elements of an array with provided values according to a provided mask array.
*
* @param {Collection} x - input array
* @param {Collection} mask - mask array
* @param {Collection} values - values to set
* @param {Options} [options] - function options
* @param {string} [options.mode='repeat'] - string specifying behavior when the number of values does not equal the number of falsy mask values
* @throws {TypeError} first argument must be a collection
* @throws {TypeError} second argument must be a collection
* @throws {TypeError} third argument must be a collection
* @throws {TypeError} options argument must be an object
* @throws {Error} must provide valid options
* @throws {Error} insufficient values to satisfy mask array
* @throws {Error} number of values does not equal the number of falsy mask values
* @throws {TypeError} third argument cannot be safely cast to the data type of the first argument
* @returns {Collection} input array
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 1, 0, 0, 1 ];
* var values = [ 20, 30 ];
*
* var out = mskput( x, mask, values );
* // returns [ 1, 20, 30, 4 ]
*
* var bool = ( out === x );
* // returns true
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 1, 0, 0, 1 ];
* var values = [ 30 ];
*
* var out = mskput( x, mask, values );
* // returns [ 1, 30, 30, 4 ]
*
* var bool = ( out === x );
* // returns true
*
* @example
* var x = [ 1, 2, 3, 4 ];
*
* var mask = [ 0, 0, 1, 0 ];
* var values = [ 20, 30 ];
*
* var out = mskput( x, mask, values );
* // returns [ 20, 30, 3, 20 ]
*
* var bool = ( out === x );
* // returns true
*/
function mskput( x, mask, values ) {
	var opts;
	var err;
	var xdt;
	var vdt;
	if ( !isCollection( x ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be an array-like object. Value: `%s`.', x ) );
	}
	if ( !isCollection( mask ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be an array-like object. Value: `%s`.', mask ) );
	}
	if ( !isCollection( values ) ) {
		throw new TypeError( format( 'invalid argument. Third argument must be an array-like object. Value: `%s`.', values ) );
	}
	opts = defaults();
	if ( arguments.length > 3 ) {
		err = validate( opts, arguments[ 3 ] );
		if ( err ) {
			throw err;
		}
	}
	xdt = dtype( x ) || 'generic';
	vdt = dtype( values ) || 'generic';

	// Safe casts are always allowed and allow same kind casts (i.e., downcasts) only when the input array data type is floating-point...
	if ( !isMostlySafeCast( vdt, xdt ) ) {
		throw new TypeError( format( 'invalid argument. Third argument cannot be safely cast to the input array data type. Data types: [%s, %s].', vdt, xdt ) );
	}
	// When performing a real-to-complex assignment, interpret the real-valued array as containing real components with implied imaginary components equal to zero and explicitly convert to a complex-valued array...
	if ( isComplexDataType( xdt ) && isRealDataType( vdt ) ) {
		values = convert( values, xdt );
	}
	// Replace values in the input array:
	return base( x, mask, values, opts.mode );
}


// EXPORTS //

module.exports = mskput;
