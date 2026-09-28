import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を削除
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数字とカンマ以外が含まれていないか確認するために、正規表現でチェックする。
            // 数値の形式: 整数 (符号付き可) を含む。
            // 許容される文字: -0-9, ,
            // 正規表現: ^[-0-9,\s]*$ (ただし空白は trim で消しているので、^[-0-9,]+$)
            // しかし、問題文では「数字とカンマ以外を含む行は妥当ではありません」とあり、
            // 空白は前後のみ無視するとあるので、内部の空白も許容すべきか検討が必要。
            // 「空白区切りの整数列」の例から、空白は区切りとして使われるが、ここでは「カンマ区切りの整数列」。
            // 「行の前後の空白は無視します」とあるが、内部の空白については明示されていない。
            // 通常、CSV 形式では空白は許容されることが多いが、「数字とカンマ以外」が含まれてはいけないので、
            // 内部の空白も「数字やカンマ以外の文字」として判定すべきか？
            // 例文の「空白区切りの整数列」は空白を区切りとして扱っていたが、今回は「カンマ区切り」。
            // 安全策として、正規表現で「[-0-9,]」のみを含む行と判定する。
            
            if (!line.matches("^[\\-0-9,]+$")) {
                continue;
            }
            
            // 上記の条件を満たした時点で、形式は妥当である（数字列が少なくとも 1 つあるか確認）。
            // 空文字列以外であれば、[-0-9,] のみを含むので、必ず何らかの数字やカンマがある。
            // ただし、「末尾のカンマは許容します」とあるので、",," や "1,," は OK。
            // 最低限「1」または「1,' も OK と解釈するが、空文字列ではないことと [-0-9,] のみという条件で十分か？
            // 「1 個以上の数字列がカンマで区切られて並んでいる」とあるので、単一の数字も OK。
            
            // 上記の regex ^[-0-9,]+$ で一致すれば、文字は全て数字またはカンマなので、
            // 少なくとも 1 つの数字が含まれているはず（空文字列ではないため）。
            // ただし、理論上「,,」のような行は存在するか？問題文「数字とカンマ以外を含む行は妥当ではありません」
            // とあるので、純粋なカンマのみは「数字列がない」とみなすべきか？
            // 「1 個以上の数字列」とあるので、必ず何らかの数字（整数）が存在する必要がある。
            // したがって、正規表現を少し厳しくし、少なくとも 1 つの数字を含むようにする。
            
            if (!line.matches("^[\\-0-9,]+$")) {
                continue;
            }
            
            // さらに、何らかの数字が含まれていることを確認
            boolean hasNumber = false;
            for (char c : line.toCharArray()) {
                if (Character.isDigit(c) || c == '-') {
                    hasNumber = true;
                    break;
                }
            }
            
            if (!hasNumber) {
                continue; // ,, などの行は数字列がないので妥当ではない
            }
            
            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
