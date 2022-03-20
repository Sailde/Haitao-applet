import {
    values
} from "../../lib/runtime/runtime";

// components/Tabs/Tabs.js
Component({
    properties: {
        titleList: {
            type: Array,
            value: []
        }
    },
    methods: {
        handkeItemTap(e) {
            const {
                index
            } = e.currentTarget.dataset
            this.triggerEvent("tavsItemChange",index)
        }
    },
})