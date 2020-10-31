# mona-message-verify

example
```
curl -X POST -H "Content-Type: application/json" -d '{"message":"card.mona.jp", "address":"MXXXXXX", "signature":"XXXXXXXX"}' localhost:3000
curl -X POST -H "Content-Type: application/json" -d '{"message":"card.mona.jp", "address":"mona1XXXXXX", "signature":"XXXXXXXX"}' localhost:3000
```
get {"result": true} or {"result": false}

test server [https://verify-message.electrum-mona.org](https://verify-message.electrum-mona.org)
