<script setup>
    import { ref } from 'vue';
    import { loadFixturesData, loadTeamsData } from './helpers/Fixtures';
    import { createFixtureTable, sortFixtures } from './helpers/Helper';
    import FixtureTable from './components/FixtureTable.vue';
    import TourSelector from './components/TourSelector.vue';
    
    let fixtures = loadFixturesData(null);
    let teams = loadTeamsData();

    let teamNames = [];

    for (let team of teams) {
        teamNames[team.id] = team.name;
    }

    let tours = [];
    for (let fixture of fixtures) {
        tours[fixture[0]] = fixture[0];
    }
    tours = tours.filter(item => item).sort((a,b) => a-b);

    const currentTour = ref(tours[tours.length - 1])
    const resultTable = ref(createFixtureTable(fixtures, teamNames));
    const currentSort = ref('pts')
    const currentSortDesc = ref(true)
    

    

    const resort = function(fixts, type, sortDesc){
        fixts = sortFixtures(fixts, type, sortDesc)
        return fixts
    }

    const sortTable = (type) => {
        console.log(type);
        if(currentSort.value == type){
            currentSortDesc.value = !currentSortDesc.value;
        }else{
            currentSortDesc.value = true
        }
        currentSort.value = type
        resultTable.value = resort(resultTable.value, currentSort.value, currentSortDesc.value);
            
    };

    const changeTour = (event) => {
        currentTour.value = +event.target.value
        fixtures = loadFixturesData(currentTour.value);
        resultTable.value = resort(createFixtureTable(fixtures, teamNames), currentSort.value, currentSortDesc.value);
    }
</script>

<template>

    <div class="container">
        <TourSelector :tours="tours" :currentTour="currentTour" @tourChanged="changeTour" />
        <FixtureTable :fixtures=resultTable :currentTour="currentTour" @changeSort="sortTable" :currentSort=currentSort :currentSortDesc=currentSortDesc />
    </div>

    <!--
<ul>
    <li v-for="item in teams" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
    -->
  
  
</template>

<style scoped>

</style>
