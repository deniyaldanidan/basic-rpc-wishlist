
# Basic Json-RPC Study

## Goal:
> [!NOTE]
> Goal of this study is to learn about Json-RPC and Build a basic implementation of it in Backend & Frontend. We are building an wishlist-app with node + express.js, zod, drizzle-orm, Html, css, js and sqlite.

## Table Of Contents:
- [Basic Json-RPC Study](#basic-json-rpc-study)
	- [Goal:](#goal)
	- [Table Of Contents:](#table-of-contents)
	- [Study:](#study)
		- [Basic Object Structure:](#basic-object-structure)
			- [Request Object:](#request-object)
			- [Response Object:](#response-object)
			- [Notification Object:](#notification-object)
			- [Parameter Structure:](#parameter-structure)
			- [Error Object:](#error-object)
		- [Batch requests:](#batch-requests)
		- [Error Codes:](#error-codes)
	- [Roadmap:](#roadmap)
	- [Resources:](#resources)
		- [Collected Info's:](#collected-infos)
		- [Other Resources:](#other-resources)


## Study:
### Basic Object Structure:
#### Request Object:
```json
{
	"jsonrpc": "2.0", // since this is json-rpc version-2
	"method": "foo", // name of the method that needs to be called
	"params": [], // Structured value that holds the params values that needs to be used during method-call. THIS MAY BE OMITTED
	"id": string | number // ID of the Request object. SHOULD BE INCLUDED IF NOT IT WILL BE IDENTIFIED AS NOTIF'S. Incase of number it should be integer
}
```
#### Response Object:
```json
{
	"jsonrpc": "2.0", // json-rpc version-2
	"result" : [], // Should be there on Success, But if failed Should not exist
	"error": [], // Should be there on Failure, But if Success should not exist
	"id": string | number
}
```
#### Notification Object:
Its just like Request object but without `id`
#### Parameter Structure:
1. by-position: must be an `array`, contains values in server expected order.
2. by-name: must be an `object`, member names match the server expected parameter names. The names must match exactly including `case`
#### Error Object:
```json
{
	"code": number, // integer that indicates error type
	"message": "short description of error",
	"data": {} // an structured value that contains additional info about the error. THIS MAY BE OMIITED CUZ THIS IS OPTIONAL
}
```
### Batch requests:
The requests can be batched and can be send in a single request. For example:
```json
[
	{"jsonrpc": "2.0", "method": "foo", "params": [12, 15], "id": 1},
	{"jsonrpc": "2.0", "method": "bar", "params": {"num": 91}, "id": 2}
]
```
### Error Codes:
Error codes from `-32768` to `-32000` are reserved for pre-defined errors.
| Code             | message          | meaning                                                                 |
| ---------------- | ---------------- | ----------------------------------------------------------------------- |
| -32700           | Parse error      | Invalid json received by server or error occured while parsing the json |
| -32600           | Invalid Request  | Json sent is not an valid request object                                |
| -32601           | Method not found | The method does not exist / is not available                            |
| -32602           | Invalid params   | Invalid method parameter(s)                                             |
| -32603           | Internal error   | Internal JSON-RPC error                                                 |
| -32000 to -32099 | Server error     | Reserved for implementation-defined server-errors                       |

## Roadmap:
- [x] Init an basic express.js server
- [x] Handle the first basic rpc-call
- [x] Handle Parse error (Invalid Json error)
- [x] Invalid method handler
- [x] Throw an `-32600` error on Invalid id `(id !== number or id !== string or id is an empty String)`
- [x] Handle method does not exist error
- [ ] Handle Invalid method param(s) error
- [ ] Add drizzle and start writing schema


## Resources:
### Collected Info's:
1. [About RPC - from WIKI](https://en.wikipedia.org/wiki/Remote_procedure_call)
2. [JSON-RPC Specification](https://www.jsonrpc.org/specification)

### Other Resources:
1. [Implementation of json-rpc-protocol - blog](https://mcpmarket.com/server/json-rpc-protocol)
2. [Implementation of json-rpc-protocol - code](https://github.com/Sabari-Vasan-SM/JSON-RPC-Protocol/tree/main)
3. [npm - json-rpc-2.0](https://www.npmjs.com/package/json-rpc-2.0)
4. [npm - json-rpc-engine](https://www.npmjs.com/package/json-rpc-engine)
5. [json-rpc + open-rpc (with multiple transports like HTTP, websockets, UDP, TCP) implementation](https://github.com/open-rpc/server-js)