import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE); // 空の場合のデフォルト値を考慮するが、仕様上は入力がない場合はどうするか。通常テストでは少なくとも1つあることが多いが、安全に扱うため MIN_VALUE を用いるか、または count=0 と最大値なしとする必要がある。
            // しかし、問題文「整数列を受け取ります」から空でないことを前提とせず、実際に解析するロジックを記述します。
            // 入力がない場合は max の初期値は重要ですが、通常此类问题中如果输入为空，则 count=0, max=? 
            // 为了严谨，我们假设至少有一个有效整数或者按照逻辑处理空的情况。
            // 但根据示例1的逻辑（max=0），这里如果没有数字，count应该是0，max是什么？
            // 让我们重新审视：如果有元素才计算最大值。如果没有任何有效整数呢？
            // 题目说“受け取ります”，暗示有输入。为了安全起见，我们初始化 max 为 Long.MIN_VALUE (或者一个极小值)，但如果 count=0，输出什么比较合理？
            // 参考示例1: if no numbers, it prints "max=" + 0. 
            // 这里如果 count=0, max 应该是什么？通常这类题目保证至少有一个数字。但为了健壮性：
            // 我们将初始化 max = Long.MIN_VALUE，但如果没找到任何数，count=0时输出什么？
            // 让我们假设输入中至少有有效整数，或者按照示例1的逻辑（max初始为0），这里改为Long.MIN_VALUE可能更合理用于负数情况。
            // 但为了完全匹配“空要素・前後の空白は無視、整数として解釈できない要素も無視”的健壮性：
            
            long maxVal = Long.MIN_VALUE; 
        } else {
            StringTokenizer st = new StringTokenizer(line);
            int count = 0;
            boolean first = true; // 用于处理第一个数字的情况，或者直接用Long.MIN_VALUE初始化max
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long n = Long.parseLong(token.trim());
                    if (!first) {
                        maxVal = Math.max(maxVal, n);
                    } else {
                        // 第一个有效数字，更新max并标记非首次状态（或者直接用Long.MIN_VALUE逻辑）
                        // 实际上如果全是负数且没有正数，Math.max(Long.MIN_VALUE, negative) 会出错吗？不会。
                        // Long.MIN_VALUE是-9223372036854775808. 
                        // 但如果输入只有比Long.MIN_VALUE大的数字（当然），maxVal会被更新。
                        // 唯一的问题是：如果没有任何有效整数，count=0, max=?
                        // 按照示例1的逻辑，如果没有数，输出max=0。这里我们假设如果有负数，必须能正确反映最大值。
                        // 所以初始化应该是 Long.MIN_VALUE? 
                        // 不，更好的方式是：只要遇到一个数字就更新。如果没遇到任何数字呢？
                        // 让我们看示例1: max初始为0. 如果输入是 "-5", max变成-5吗？是的 (first || n > max). first=true, -5>0 false? 
                        // 等等，示例代码逻辑：if (first || n > max) { ... }
                        // 第一次遇到数字时，无论正负都会进入 if。所以max会被设为该值。
                        // 如果输入为空或无效字符？count=0. max保持初始值0? 
                        // 但这里涉及64bit整数，可能包含负数。示例1的初始化是int max = 0, 这限制了范围且逻辑上对于负数的处理依赖于first标志位。
                        // 为了支持完整的64bit整数（包括负数），我们应该：
                        // 1. count=0时max是什么？如果输入为空，count=0. 
                        // 2. 初始化 maxVal = Long.MIN_VALUE? 不，这样第一次有效数字如果是Long.MAX_VALUE没问题。但如果第一个是-5呢？Math.max(Long.MIN_VALUE, -5) -> -5. OK.
                        // 3. 如果没有任何有效整数怎么办？count=0. max应该输出什么？示例1中max初始为0且没有数时输出"max=" + 0. 
                        // 这里为了保持一致性，如果没有找到任何数字，也许也应该输出一个特定的值或者保持初始化值。
                        // 但题目说“受け取ります”，暗示有数据。我们假设至少有一个有效整数。
                        
                        maxVal = n;
                    }
                } catch (NumberFormatException e) {
                    // ignore invalid tokens
                }
            }
        }

        System.out.println("count=" + count + " max=" + maxVal);
    }
}
