/*
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

import Complex128Array = require( '@stdlib/array-complex128' );
import Complex64Array = require( '@stdlib/array-complex64' );
import Complex128 = require( '@stdlib/complex-float64-ctor' );
import AccessorArray = require( '@stdlib/array-base-accessor' );
import mskput = require( './index' );


// TESTS //

// The function returns an array...
{
	mskput( [ 1, 2, 3, 4 ], [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectType number[]
	mskput( new Int32Array( [ 1, 2, 3, 4 ] ), [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectType Int32Array
	mskput( new Complex128Array( [ 1, 2, 3, 4 ] ), [ 1, 0, 0, 1 ], [ new Complex128( 20, 30 ), [ 40, 50 ] ] ); // $ExpectType Complex128Array
	mskput( new Complex64Array( [ 1, 2, 3, 4 ] ), [ 1, 0, 0, 1 ], [ new Complex128( 20, 30 ), [ 40, 50 ] ] ); // $ExpectType Complex64Array
	mskput( new AccessorArray<number>( [ 1, 2, 3, 4 ] ), [ 1, 0, 0, 1 ], new AccessorArray<number>( [ 20, 30 ] ) ); // $ExpectType AccessorArrayLike<number>
}

// The compiler throws an error if the function is provided a first argument which is not an array-like object...
{
	mskput( 1, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
	mskput( true, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
	mskput( false, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
	mskput( null, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
	mskput( void 0, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
	mskput( {}, [ 1, 0, 0, 1 ], [ 20, 30 ] ); // $ExpectError
}

// The compiler throws an error if the function is provided a second argument which is not an array-like object...
{
	mskput( [], 1, [ 20, 30 ] ); // $ExpectError
	mskput( [], true, [ 20, 30 ] ); // $ExpectError
	mskput( [], false, [ 20, 30 ] ); // $ExpectError
	mskput( [], null, [ 20, 30 ] ); // $ExpectError
	mskput( [], void 0, [ 20, 30 ] ); // $ExpectError
	mskput( [], {}, [ 20, 30 ] ); // $ExpectError
}

// The compiler throws an error if the function is provided a third argument which is not an array-like object...
{
	mskput( [], [ 1, 0, 0, 1 ], 1 ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], true ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], false ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], null ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], void 0 ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], {} ); // $ExpectError
}

// The compiler throws an error if the function is provided a fourth argument which is not an object...
{
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], '1' ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], 1 ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], true ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], false ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], null ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], [] ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], ( x: number ): number => x ); // $ExpectError
}

// The compiler throws an error if the function is provided a `mode` option which is not a valid mode...
{
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': '1' } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': 1 } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': true } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': false } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': null } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': {} } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': [] } ); // $ExpectError
	mskput( [], [ 1, 0, 0, 1 ], [ 20, 30 ], { 'mode': ( x: number ): number => x } ); // $ExpectError
}

// The compiler throws an error if the function is provided an unsupported number of arguments...
{
	mskput(); // $ExpectError
	mskput( [] ); // $ExpectError
	mskput( [], [] ); // $ExpectError
	mskput( [], [], [], {}, {} ); // $ExpectError
}
