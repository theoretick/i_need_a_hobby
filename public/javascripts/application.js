
var need_a_hobby = {
    // traverse item for note_a, note_j, note_* and concat them
    // this is legacy and probably more trouble than its worth
    build_notes: function(line_item) {
        var all_notes = '',
            letters = "abcdefghijklmnopqrstuvwxyz";

        for (var i = 0, j = letters.length; i < j; i++) {
            var character = letters.charAt(i),
                current_note = "note_" + character;
            if (typeof(line_item[current_note]) !== 'undefined') {
                all_notes += line_item[current_note] + "\n"
            }
        }
        return all_notes;
    },

    fetch_notes: function(line_item) {
        if (typeof(line_item.notes) !== 'undefined') {
            return line_item.notes;
        }
        else {
            return this.build_notes(line_item);
        }
    },

    //    ┬──┬﻿ ノ( ゜-゜ノ)
    build_hobby_table: function(all_hobbies) {
        for (var i = 0, j = all_hobbies.length; i < j; i++) {
            var item = all_hobbies[i];

            $('#hobby-list').append('<tr><td class="item-names">' +
                                    item.name +
                                    '</td><td class="item-tags">' +
                                    (typeof(item.tags) !== 'undefined' ? item.tags : '') +
                                    '</td><td class="item-notes">' +
                                    this.fetch_notes(item) +
                                    '</td></tr>' );
        }
    },

    // get the party started
    load: function() {
        var JSON_URL = 'https://gist.githubusercontent.com/theoretick/85ed91a97cf42d767410/raw/6e35dc36aecc74492b3a62727ca45d61248fd7ca/hobbies.json';
        $.get(JSON_URL, function(data) {
            all_hobbies = JSON.parse(data).hobbies;

            need_a_hobby.build_hobby_table(all_hobbies);

            // init data_table
            $('#hobby-list').DataTable( {
                "paging":   false,
                "ordering": true,
                "info":     false
            });
        });
    }
}

$(document).ready(function(){
  need_a_hobby.load();
});