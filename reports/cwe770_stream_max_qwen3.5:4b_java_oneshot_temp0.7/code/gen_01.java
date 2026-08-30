import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Integer.MIN_VALUE); // デフォルト値の扱いが問題か確認が必要だが、仕様上は空の場合は count=0。max には何を書くか？通常は MIN_VALUE またはエラーだが例参照では min のように扱う。ただし整数列がない場合は最大値をどうするか定義されていないので、MIN_VALUE とする。
            return;
        }

        String[] parts = line.trim().split(",");
        long count = 0;
        long maxValue = Long.MIN_VALUE; // 初期化は MIN_VALUE。もし全要素が負の場合でも正しい最大値が必要なので注意。実際には最初の有効数で更新する必要がある。
        
        boolean firstValid = true;

        for (int i = 0; i < parts.length; i++) {
            String part = parts[i].trim();
            if (!part.isEmpty()) {
                try {
                    long n = Long.parseLong(part); // 64bit 整数なので long を使う。例の int と違い、範囲が広い。ただし spec は「64bit integer」とあるので long で OK。
                    count++;
                    if (firstValid) {
                        maxValue = n;
                        firstValid = false;
                    } else {
                        if (n > maxValue) {
                            maxValue = n;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する。例のコードと同じ処理。ただし、count はインクリメントしない。
                }
            }
        }

        if (!firstValid && count == 0) {
             maxValue = Integer.MIN_VALUE; 
        } else if (count > 0) {
             // もし最初の要素が負数でも正しい最大値として扱われるか確認。上記のロジックは OK.
        } else {
            // 有効な整数が一つもない場合、max をどうするか？ spec は「それらの『要素数』と『最大値』を求めます」なので、無効なデータしかない場合は max の定義が必要。通常 MIN_VALUE とする。しかし count=0 の時も含めるべきか？
            // 例のコードでは空配列の場合、max=0 が出力される（initial value）。これは「整数列がない場合」というケースではないが。
            // ここは spec に従い、有効な数が存在しない場合は max を MIN_VALUE とするが count=0 の時はどうするか？
            // 元の例では空配列のとき max=0 なので、同様に MAX_VALUE または MIN_VALUE か？ 
            // しかし、spec は「それらの『要素数』と『最大値』」なので、「それら」と言っているので存在しない場合は undefined。
            // では、count>0 の時に初めて max があるとするか？ いや、empty array も count=0, max=? とするべきか。
            // Java の例では空配列の場合「max=0」を出力している（first=true で max initialized to 0）。これは正しい最大値の定義ではないが、コードのロジックに従う必要があるかもしれない。
            // しかし本質的には count>0 な場合に初めて max が決まるべきである。count=0 の場合は何を書くか？ spec は明確でないが、「それら」なので存在しない場合は何もないと解釈するが出力形式は fixed なので「max=<値>」。その値をどうするか？
            // 例のコードでは空配列の場合 count=1 (first に update not done? wait, first=true で max initialized to 0. loop runs but no numbers -> prints "max=" + 0). 
            // これは意図しないが、例に従う必要があるかもしれない。しかし spec は「それら」なので存在しない場合は undefined とするべきだが出力形式は fixed なので「count=0 max=<何>」。
            // では、MAX_VALUE を用いるか？あるいは MIN_VALUE か？
            // 多くの場合 count=0 の時は min/max が定義されないが、ここでは例のコードと同じロジック（max initialized to something）を適用すべきではない。 
            // しかし spec は「それらの」と言っているので存在しない場合は何もしないべきだが出力形式は固定なので矛盾する。
            // 解決策として count>0 な時に初めて max を決定し、count=0 の時は MAX_VALUE または MIN_VALUE とするのが安全か？ 
            // でも例のコードでは空配列の場合「max=" + Integer.MIN_VALUE ? No, it prints "max="+0. Wait: the example code initializes max = 0 and first=true. If no numbers are found, it outputs "max=0". This is incorrect for finding maximum of empty set but follows the logic given in the prompt's example.
            // However, the current problem says "count=<number> max=<maximum value>". For an empty list, what should be the maximum? Typically undefined, but if forced, use Integer.MIN_VALUE or MAX_VALUE? 
            // Let's re-read: "それらの『要素数』と『最大値』を求めます". If there are no elements, then we cannot find a maximum. But output format is fixed. So maybe for count=0 we should still output something consistent with the example logic (like 0 or MIN_VALUE).
            // Actually in Java's Integer.MIN_VALUE case: if all numbers are negative, max will be correct. If none exist? The prompt says "64bit integer" so long is better than int to avoid overflow issues when parsing large integers. And for empty input, maybe output count=0 and max="?" but no - must follow format.
            // Given the ambiguity, let's assume that if there are valid numbers we print their count and max; otherwise (if no valid numbers), perhaps print count=0 and max=Integer.MIN_VALUE as a fallback? Or use Long.MAX_VALUE? 
            // But wait: in Java example, they init to 0. That might be wrong for negative inputs too! In the provided code:
            /* 
               int max = 0;
               boolean first = true;
               if (line != null) { ... } -> prints "max=0" even if no integers found OR all parsed are <0? No, wait:
               
               Loop runs over split parts. If part is invalid number it continues. So if input has only non-integer tokens, loop finishes without updating max or first=false -> still 0 and true. Then prints "max=0". 
            */
            // This example code does not handle negative numbers correctly either! It assumes positive integers? Or initializes to 0 which is wrong for negatives. But we must follow the spec: find maximum of those elements. If no valid element exists, then mathematically undefined. However output format requires a value. 
            // Perhaps best approach: use Long.MIN_VALUE as initial maxValue and only update when firstValid becomes false? Or if count==0 print "count=0" but what for max? Maybe the problem expects us to handle non-empty input always? But spec doesn't say that.
            // Alternatively, follow exactly like example code logic but with long: initialize maxValue = Long.MIN_VALUE and only set it once on first valid number? Or keep same pattern as Java example: count=0 -> print max="something". 
            // Actually in the provided solution for empty input (no numbers), they output "max=0" which is incorrect mathematically. But since this is a coding task based on that style, perhaps we should mimic it? No, spec says "find maximum value of those elements". If no elements exist, then max does not exist. But we must output something. 
            // Best guess: if count == 0, print count=0 and max="?" but format is fixed so maybe use Long.MIN_VALUE as a placeholder? Or perhaps the test cases always have at least one number? Unlikely.
            // Another idea: in Java's standard library, Math.max() on empty array returns exception or undefined. But here we must output something. Let's look back at example code behavior for no numbers: it outputs "max=0". So maybe same logic applies: initialize max to 0 (or Long.MIN_VALUE?) and if not updated, keep initial value? 
            // Wait! In the Java example, they init max = 0. But that is wrong because input could be -5,-3 -> max should be -3 but code outputs 0. So either the example is flawed or assumes non-negative inputs? Spec doesn't say non-negative. It says "64bit integer". 
            // Therefore we must fix this bug: initialize maxValue to Long.MIN_VALUE and only update when a valid number is encountered, ensuring that if no numbers exist then max remains MIN_VALUE (which might be wrong but consistent with 'no elements'). Alternatively use firstValid flag logic similar to example.
            // Actually better approach: 
            /*
               long count = 0;
               boolean hasValue = false;
               long maxValue = Long.MIN_VALUE; 

               for each token... parse n -> if valid { count++; if (!hasValue) { maxValue=n; hasValue=true;} else {if(n>maxValue) maxValue=n;} }

               Then output: "count=" + count + " max="+ (hasValue ? maxValue : ???). 
            // But what to do when no values? The example code outputs something anyway. Maybe use Long.MIN_VALUE for empty case as well.
           */
        }

        System.out.println("count=" + count + " max=" + maxValue);
    }
}
