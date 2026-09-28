import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            if (line == "") {
                continue;
            }
            
            boolean isBlankOnly = true;
            StringTokenizer st = new StringTokenizer(line);
            
            // 空白のみをチェック
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                if (!token.matches("-?[0-9]+")) {
                    isBlankOnly = false;
                    break;
                }
            }
            
            // 行全体が空白（空白文字のみ）かチェック
            if (isBlankOnly) {
                // token が存在しない場合も空白行として扱うため、ここで continue をせず、
                // tokenize した結果がない場合でも空白行とみなす必要がある。
                // しかし、問題文「1 個以上の数字列がカンマで区切られて並んでいる」
                // は、token があることが前提だが、「末尾のカンマは許容する」という点から、
                // "a,b," のように末尾にカンマがある場合も token "a", "b" が得られる。
                // また「数字とカンマ以外を含む行は妥当ではありません」とあり、
                // 空白文字（スペースやタブ）は「数字とカンマ以外」と解釈するか、
                // 「前後の空白は無視する」という条件から、本質的な内容が空でないか判断する。
                
                // 再考：問題文「1 個以上の数字列がカンマで区切られて並んでいる」
                // これは、token 化後、少なくとも 1 つの整数トークンが存在し、かつトークンの間にカンマがある（または末尾カンマを含む）こと。
                // 空白文字は「数字とカンマ以外」として不適格な可能性が高いが、「前後の空白は無視する」からは、
                // 本質的なトークンがない行（例："   "）は妥当ではないと判断するのが自然。
                
                // トークンが存在しない場合（空行または空白のみ）は不適格。
                if (st.countTokens() == 0) {
                    continue;
                }
            } else {
                //トークンに少なくとも1つあるが、数字以外が含まれているか
                boolean containsNonNumber = false;
                while (st.hasMoreTokens()) {
                    String token = st.nextToken();
                    if (!token.matches("-?[0-9]+")) {
                        containsNonNumber = true;
                        break;
                    }
                }
                if (containsNonNumber) {
                    continue;
                }
            }
            
            // 妥当な行
            validLines++;
        }
        
        System.out.println("valid=" + validLines);
    }
}
