# backend-application
[![Build Status](https://travis-ci.org/racketometer/backend-application.svg?branch=master)](https://travis-ci.org/racketometer/backend-application)
[![Coverage Status](https://coveralls.io/repos/github/racketometer/backend-application/badge.svg?branch=master)](https://coveralls.io/github/racketometer/backend-application?branch=master)
[![dependencies Status](https://david-dm.org/racketometer/backend-application/status.svg)](https://david-dm.org/racketometer/backend-application)
[![devDependencies Status](https://david-dm.org/racketometer/backend-application/dev-status.svg)](https://david-dm.org/racketometer/backend-application?type=dev)

### Apollo Server application using MongoDB

# IoC
Using the `inversify` library we get dependency injection capabilities.
For a class to be injectable add the `@injectable()` decorator to it and register it in the `ioc.config.ts` and `ioc.types.ts` files

```typescript
// myNeed.ts
import { injectable } from 'inversify';

@injectable()
class MyNeed { }

// ioc.types.ts
const TYPES = {
  MyNeed: Sumbol("MyNeed"),
};

// ioc.config.ts
import { MyNeed } from './myNeed';

...

container.bind<MyNeed>(TYPES.MyNeed).to(MyNeed);
```

When in need of an injectable entity use the `@inject(<TYPE>)` decorator in the constructor as below.

```typescript
import { inject } from 'inversify';
import { TYPES } from './ioc.types';

class InNeed {
  constructor(@inject(TYPES.MyNeed) myNeed: MyNeed) { }
}
```
