class Pubsub {
    events: Record<string, Array<unknown>>;
    constructor() {
        this.events = {};
    }

    subscription(eventName, func) {
        return {
            subscribe: () => {
                if (this.events[eventName]) {
                    this.events[eventName].push(func);
                } else {
                    this.events[eventName] = [func];
                }
            },

            unsubscribe: () => {
                if (this.events[eventName]) {
                    this.events[eventName] = this.events[eventName].filter((subscriber) => subscriber !== func);
                }
            },

        };
    }

    publish(eventName: string, ...args: unknown[]) {
        const funcs = this.events[eventName];
        if (Array.isArray(funcs)) {
            funcs.forEach((func) => {
                func(...args);
            });
        }
    }
}

const speak = (param) => {
    console.log(`I am ${param}`);
};

const greetAll = (x, y, z) => {
    console.log(`Hello ${x}, ${y}, ${z}`);
};

const pubsub = new Pubsub();

pubsub.subscription('greet', greetAll).subscribe(); // prints greetAll has subscribed to greet Topic!

pubsub.subscription('sayName', speak).subscribe(); // prints speak has subscribed to sayName Topic!
pubsub.subscription('sayName', greetAll).unsubscribe(); // prints greetAll has unsubscribed from sayName Topic!

pubsub.publish('greet', 'Lawrence Eagles', 'John Doe', 'Jane Doe'); // prints Hello Lawrence Eagles, John Doe, Jane Doe

pubsub.publish('sayName', 'Lawrence Eagles'); // prints I am Lawrence Eagles
