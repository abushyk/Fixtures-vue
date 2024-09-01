export const createRObject = (id, name) => {
    return {
        id: id,
        position: 0,
        name: name,
        games: 0,
        wins: 0,
        draws: 0,
        loses: 0,
        gf: 0,
        ga: 0,
        gdiff: 0,
        pts: 0,
    };
}

export const formatMatch = (fixture_sort, id, teamNames) => {
    let matchresult = 'd';
    if(fixture_sort[1] === id && fixture_sort[3] > fixture_sort[4]){
        matchresult = 'w';
    }else if(fixture_sort[1] === id && fixture_sort[3] < fixture_sort[4]){
        matchresult = 'l';
    }else if(fixture_sort[2] === id && fixture_sort[3] > fixture_sort[4]){
        matchresult = 'l';
    }else if(fixture_sort[2] === id && fixture_sort[3] < fixture_sort[4]){
        matchresult = 'w';
    }

    let str = teamNames[fixture_sort[1]] + ' - ' + teamNames[fixture_sort[2]] + ' ' + fixture_sort[3] + ':' + fixture_sort[4];

    return [matchresult, str];
}

export const createFixtureTable = (fixtures, teamNames) => {

    let result = [];
    for (let fixture of fixtures) {
        let t1id = fixture[1];
        let t2id = fixture[2];
        let round = fixture[0];
        let t1score = fixture[3];
        let t2score = fixture[4];
        if (!result[t1id]) {
            result[t1id] = createRObject(t1id, teamNames[t1id]);
        }
        if (!result[t2id]) {
            result[t2id] = createRObject(t2id, teamNames[t2id]);
        }

        result[t1id].games += 1;
        result[t2id].games += 1;

        result[t1id].gf += t1score;
        result[t2id].gf += t2score;

        result[t1id].ga += t2score;
        result[t2id].ga += t1score;

        if (t1score === t2score) {
            result[t1id].draws += 1;
            result[t2id].draws += 1;

            result[t1id].pts += 1;
            result[t2id].pts += 1;
        } else if (t1score > t2score) {
            result[t1id].wins += 1;
            result[t2id].loses += 1;

            result[t1id].pts += 3;
        } else {
            result[t1id].loses += 1;
            result[t2id].wins += 1;

            result[t2id].pts += 3;
        }

        result[t1id].gdiff += t1score - t2score;
        result[t2id].gdiff += t2score - t1score;
    }

    result = result.filter(function (el) {
        return el != null;
    });

    let fixtures_sort = [...fixtures];

    fixtures_sort = fixtures_sort.sort((a, b) => {
        if (a[0] < b[0]) {
            return 1;
        } else if (a[0] > b[0]) {
            return -1;
        } else {
            return 0;
        }
    });

    result.map((item) => {
        let id = item.id;
        item.last = [];

        for (let fixture_sort of fixtures_sort) {
            if((fixture_sort[1] === id || fixture_sort[2] === id) && item.last.length < 5){
                item.last.push(formatMatch(fixture_sort, id, teamNames));
            }
        }
    });

    result.sort((a, b) => {
        if (a.pts < b.pts) {
            return 1;
        } else if (a.pts > b.pts) {
            return -1;
        } else {
            return 0;
        }
    });
    let pos = 1;
    result.map((item) => {
        item.position = pos;
        pos += 1;
    });

    return result;
}

export const sortFixtures = (fixtures, bywhat, sortDesc) => {
    let sortableItems = fixtures.sort((a, b) => {
    if(sortDesc){
        if (a[bywhat] < b[bywhat]) {
        return 1;
        } else if (a[bywhat] > b[bywhat]) {
        return -1;
        } else {
        return 0;
        }
    }else{
        if (a[bywhat] > b[bywhat]) {
        return 1;
        } else if (a[bywhat] < b[bywhat]) {
        return -1;
        } else {
        return 0;
        }
    } 
            
    });
    return sortableItems
};