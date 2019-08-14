(function (window) {
    var $ = window.jQuery;
    
    $.pronKorean = function (input) {
        var CHO = [
            'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b',
            'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k',
            't', 'p', 'h'
            // 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ',
            // 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ',
            // 'ㅌ', 'ㅍ', 'ㅎ'
        ];
        var JUNG = [
            'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye',
            'o', 'wa', 'wae', 'oe', 'yo', 'u', 'weo', 'we',
            'wi', 'yu', 'eu', 'yi', 'i'
            // 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ',
            // 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ',
            // 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
        ];
        var JONG = [
            '', 'G', 'kk', 'ks', 'n', 'nj', 'nh', 'D',
            'L', 'lk', 'lm', 'lp', 'ls', 'lt', 'lp', 'lh',
            'm', 'B', 'ps', 's', 'ss', 'ng', 'j', 'cc',
            'k', 't', 'p', 'h'
            // '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ',
            // 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
            // 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ',
            // 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
        ];

        var isHangul = function (code) {
            return 0xAC00 <= code && code <= 0xd7a3;
        };

        var output = '';

        var code;
        var length = input.length;
        for (var i = 0; i < length; ++ i) {
            code = input.charCodeAt(i);

            if (isHangul(code)) {
                var newCode = code - 0xAC00;
                var jong = newCode % 28;
                var jung = (newCode - jong) / 28 % 21;
                var cho = parseInt((newCode - jong) / 28 / 21);
                output += CHO[cho] + JUNG[jung] + JONG[jong];
            } else {
                output += input[i];
            }
        }

        return output
            .replace(/G([aeoiuyw])/g, 'g$1')
            .replace(/G/g, 'k')
            .replace(/B([aeoiuyw])/g, 'b$1')
            .replace(/B/g, 'p')
            .replace(/D([aeoiuyw])/g, 'd$1')
            .replace(/D/g, 't')
            .replace(/(L[rl]|rr)/g, 'll')
            .replace(/L([aeoiuyw])/g, 'r$1')
            .replace(/L/g, 'l')
            .replace(/weo/g, 'wo')
            .replace(/yi/g, 'ui')
            .replace(/kk(\s|,|\.)/g, 'k$1')
            .replace(/(j|ss|s|cc)(\s|,|\.)/g, 't$2');
    };
})(window);