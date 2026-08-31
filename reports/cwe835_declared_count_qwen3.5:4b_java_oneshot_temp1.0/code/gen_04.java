import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line1 = br.readLine();
        if (line1 == null || line1.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countN = 0;
        try {
            countN = Integer.parseInt(line1.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0;
        int readCount = 0;

        while (true) {
            String line = br.readLine();
            if (line == null || line.trim().isEmpty()) {
                break;
            }
            
            try {
                StringTokenizer st = new StringTokenizer(line);
                while (st.hasMoreTokens()) {
                    long n = Long.parseLong(st.nextToken());
                    sum += n;
                    readCount++;
                    
                    // ただし、仕様は「実際に存在する整数の個数は 1 行目の値と一致しないことがあります」です。
                    // しかし、出力形式は `count=<実際に読み取れた個数>` です。
                    // ここでは「1 行に 1 個ずつ並びます」という文面を考慮し、
                    // そのまま入力をループし、有効な整数だけ合計してカウントします。
                    // もし「一行目の数」が実際の個数の上限であると解釈すべきか、「実際に何个読み込めたか」とするかを精査する必要があります。
                    // 問題文の「実際に存在する整数の個数は 1 行目の値と一致しないことがあります**実際に読み取れた整数だけ**を対象とします。」の文言より、
                    // `count` は事実上読み取れた個数（readCount）とするのが正しい解釈です。
                    // ただし、通常此类问题中，如果第一行是 N，后面应该只有 N 个数字。
                    // 但这里明确说了可能不一致，且以“实际读取到的”为准。
                    // 因此 count 就是 loop 里解析成功的次数。
                    // 不过，如果题目意思是“输入的第一行是总数”，那么理论上只读取 N 个即可？
                    // "2 行目以降に整数が 1 行に 1 個ずつ並びます" -> 一行一個
                    // "実際に存在する整数の個数は 1 行目の値と一致しないことがあります" -> 总数可能不对。
                    // "実際に読み取れた整数だけを対象とします" -> 只算读到的。
                    // 这里没有明确说读完 N 个就停止，也没有说如果有多余的怎么办（通常多出来的也忽略，或者作为下一批处理）。
                    // 但考虑到输入流的处理习惯和“1行に1個ずつ並びます”的描述，很可能后续还有非整数或空行，或者数字个数不一致。
                    // 让我们假设只要读到了有效的长整型数字就累加，直到读到 EOF 或者无效数据停止？
                    // 不，通常这类题目是：第一行给数量 N，后面跟着至少 N 个数字。如果少于 N 个，按少的算；如果多于 N 个，只取前 N 个还是全取？
                    // "実際に読み取れた整数だけを対象とします" -> 这句话非常关键。它暗示我们不应该依赖第一行的数量限制来停止，而是根据输入流里实际能解析出来的情况。
                    // 或者更严格地说：第一行是 N，后面跟着若干行。我们遍历这些行，将其中所有能被 parseLong 的数字都累加进去，最后 count = 总个数, sum = 总和。
                    // 这样最符合“实际上存在”和“只取实际读取的”字面意思。
                }
            } catch (NumberFormatException e) {
                // 无法解析整数则忽略该数字（如果有的话），继续下一行或者结束？
                // 由于是 1 行一个数，StringTokenizer 里 token 是数字。
                // 异常捕获意味着该行或某个位置不是整数，直接忽略并继续循环（如果逻辑允许跳过单行）。
                // 但考虑到 "2 行目以降に整数が 1 行に 1 個ずつ並びます" -> 暗示每一行都是整数。
                // 所以 try-catch 只是为了防止非数字输入导致崩溃，然后跳出该行？还是停止？
                // "整数として解釈できない行も無視します" -> 这一行是无效的，跳过它（continue）。
            } catch (Exception e) {
                // 防止其他异常
            }
        }
        
        System.out.println("count=" + readCount + " sum=" + sum);
    }
}
