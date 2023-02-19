# vue-signaler

A tiny eventbus library for vue 3

- It provides a plugin and composables for using event bus
- just simply plug it with your vue and it will take care of everything

## installation 
```sh
npm i vue-signaler
```

## usage

##### To use the library in Vue 3

In the main.js file, import the eventBus and use it as plugin

```vue
<script>

import { eventBus } from 'vue-signaler'

app.use(eventBus)

</script>
```

In the components, we can access the eventBus using the composable
useEventBus

```vue
<script>
import { useEventBus } from 'vue-signaler'

const { eventBus } = useEventBus();

eventBus.on('eventName', (data)=>{
  console.log(data)
})

eventBus.emit('eventName' , { name : 'rogue-striker' })

</script>
```
