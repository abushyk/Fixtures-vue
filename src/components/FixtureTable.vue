<script setup>
    import MatchIcon from './MatchIcon.vue';
    import Modal from './Modal.vue';

    const props = defineProps(['fixtures', 'currentSort', 'currentSortDesc', 'currentTour'])

</script>

<template>
    <div>
        <table class="result-table table">
            <thead>
                <tr>
                    <th># {{ currentTour }}</th>
                    <th>Team</th>
                    <th>MP</th>
                    <th class="sortable" @click="$emit('changeSort', 'wins')">
                        <span>W</span>
                        <span v-if="currentSort == 'wins'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'draws')">
                        <span>D</span>
                        <span v-if="currentSort == 'draws'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'loses')">
                        <span>L</span>
                        <span v-if="currentSort == 'loses'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'gf')">
                        <span>F</span>
                        <span v-if="currentSort == 'gf'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'ga')">
                        <span>A</span>
                        <span v-if="currentSort == 'ga'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'gdiff')">
                        <span>D</span>
                        <span v-if="currentSort == 'gdiff'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th class="sortable" @click="$emit('changeSort', 'pts')">
                        <span>PTS</span>
                        <span v-if="currentSort == 'pts'">
                            <span v-if="currentSortDesc">
                                <i class="fa fa-caret-down"></i>
                            </span>
                            <span v-else>
                                <i class="fa fa-caret-up"></i>
                            </span>
                        </span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, findex) in fixtures" :key=findex>
                    <td>{{item.position}}</td>
                    <td>
                        {{ item.name }}
                    </td>
                    <td>{{item.games}}</td>
                    <td>
                    {{ item.wins }}
                    </td>
                    <td className="num"
                    >
                        {{item.draws}}
                    </td>
                    <td className="num"
                    >
                        {{item.loses}}
                    </td>
                    <td className="num">{{item.gf}}</td>
                    <td className="num">{{item.ga}}</td>
                    <td>{{item.gdiff}}</td>
                    <td>{{item.pts}}</td>
                    <td>
                        <MatchIcon v-for="(lastitem, index) in item.last" :key=index :item=lastitem />
                    </td>
                </tr>
            </tbody>
            
        </table>
    </div>    
</template>