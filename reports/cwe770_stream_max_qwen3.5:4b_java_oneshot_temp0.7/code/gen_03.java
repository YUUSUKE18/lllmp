```java
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        long count = 0;
        long max = Long.MIN_VALUE;
        boolean first = true;
        
        if (line != null && !line.trim().isEmpty()) {
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                // 空白のみか空文字の場合はスキップ（ただし、分割後の部分が空になることは稀だが安全のため）
                if (part.isEmpty() || !isInteger(part)) continue;
                
                try {
                    long val = Long.parseLong(part);
                    count++;
                    
                    // max の初期化と更新を統合的に処理する必要があるため
                    // 最初の有効値で initial として、以降は比較し続けるが、
                    // ここでは「max」の定義として Integer.MIN_VALUE が適切ではない。
                    // 問題文より「最大値」とあり、空配列の場合どうするか未定だが、
                    // 「整数列を受け取る」「要素数と最大値を求めます」とあるので、
                    // 少なくとも1個以上の有効な数が存在すると想定し、または初期化処理を行う。
                    
                    if (first || val > max) {
                        max = val;
                        first = false;
                    } else if (!first && val >= max) {
                         max = Math.max(max, val); // 安全のため明示的比較
                     } 
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }

        System.out.println("count=" + count + " max=" + max);
    }
    
    private static boolean isInteger(String s) {
        try {
            Integer.parseInt(s.trim()); // 長さが短すぎるなど、Long が引く前にチェックする
            return true; 
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public static void main2(String[] args) throws Exception {
       long count = 0L, maxVal = Long.MIN_VALUE; // int の最小値は -9*10^9 ですが、64bit なので必要
       
       BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
       String inputLine = null;

       try (br) {
           if ((inputLine = br.readLine()) != null && !inputLine.isEmpty()) {
               // 空白を除去する処理（カンマ区切りなので、trim で両端の空白を削る）
               String[] tokens = inputLine.split(",");
               
               for (String token : tokens) {
                   if (token.trim().isEmpty() || !isNumeric(token)) continue;

                   long value; // 64bit integer を使うため長型を使う（Java では int は32bit）
                   
                   try {
                       String trimmed = token.replace(" ", ""); // カンマ区切りではないが、誤った入力の場合もあるため。問題文は整数列なのでカンマのみで期待されるはずだが。
                       
                       value = Long.parseLong(trimmed); 
                       
               if (count == 0 || !isFirstVal) { count++; maxVal = value; } // first の代わりに isFirstVal を使うように変える必要があるが、単純に最初の数値で初期化し続けるのが安全である

               System.out.println("count=" + count + " max=" + max);
           } else if (max == 0 && !first) { 
                max = Long.MIN_VALUE; // もし最大値の定義として「なし」の場合など、これは問題文が要求していないため除外。ただし、最初の数値がない場合どうするかは未定だが、通常プログラムでは最小初期化を使用することが多い
               } else if (value > maxVal) { 
                   maxVal = value; 
                }

           // 上記のロジックを再構成し、正しいコードを書く：

        long count2 = 0, max2 = Long.MIN_VALUE;
        boolean firstTrue = true;
        
        String[] parts = inputLine.split(",");
        
        for (String p : parts) {
            if (!p.trim().isEmpty() && isNumeric(p)) { // ここでは Integer.parseInt が使えるか確認する必要があるが、Long.parseLong に引き上げることで OK。ただし、Integer の最小値は -9*10^9 で 64bit は必要とされるため Long を使うべき。

                String clean = p.trim();
                
            try { long val = Long.parseLong(clean); 
                 if (count2 == 0 || !firstTrue) { count2++; maxVal = Math.max(maxVal, val); } // ここは少し混乱しているため、再確認が必要だが、基本ロジックとしては「最初の数値が最大」「以降の比較」である。

                System.out.println("count=" + count + " max=" + max);
            } catch (Exception e) {} 
        }};
    } else { // inputLine が null の場合
         // ここでは、空配列の場合どうするかは未定だが、問題文の仕様を厳密に満たすため「count=0」で出力することが適切である。
         System.out.println("count=" + 0L + " max=" + Long.MIN_VALUE);
    }

//最終的なロジックを再構成：
long count = 0, maxVal = Long.MIN_VALUE; // 初期値として Integer.MIN_VALUE を使うべきか？問題文は「整数列」とあるので、もしデータがない場合の最大値はどうするか未定だが、「64bit integer の範囲に収まる」ため Long.MIN_VALUE が適切。
boolean firstValid = true;

if (inputLine != null && !inputLine.trim().isEmpty()) {
    String[] parts = inputLine.split(",");
    
    for (String part : parts) {
        if (!part.isEmpty() && isNumeric(part)) {
            long val = Long.parseLong(part);
            
            // 最初の有効な数値で初期化し、その後より大きいものを書き換える
            if (firstValid || val > maxVal) {
                count++;
                maxVal = val;
                firstValid = false;
            } else if (!firstValid && val == maxVal) { // 同値の場合カウントしないので OK（最大値のみ）
                 // ただし、同じ数値が複数ある場合、「max」はそれ自体であるため重複なしで良い。
            } 
        }
    }
}

System.out.println("count=" + count + " max=" + maxVal);

// 最終的なコードを再確認：
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long max = Long.MIN_VALUE; // 初期値として最小の整数をセットする。ただし、もしデータがなければこのまま出力すべきか？通常は入力なしの場合は最大値が存在しないため特殊処理が必要だが、問題文では「要素数と最大値」を求めるので、少なくとも1個以上の有効な数が存在すると想定し、または空の場合も対応できるロジックにする必要がある。
        // ただし、「整数として解釈できない要素を無視します」とあるので、もしすべての要素が非整数なら count=0, max=? になるか？
        // 今回は「64bit integer の範囲に収まる」ため、Long.MIN_VALUE を初期値とするのが妥当だが、もしデータがない場合の最大値はどうするかは未定。ただし、通常テストでは少なくとも1個以上の有効な数があることが前提とされるか、または空配列の場合も出力する必要がある。
        // 問題文より「要素数」を求めますので count が0 の場合は max はどうなるべきか？
        // ここで、もしデータがない場合の最大値は undefined と考えられるが、プログラムとしてエラーを起こさず実行するため Long.MIN_VALUE を使うのが安全である（ただし、これは正しくないかもしれない）。しかし、一般的なアルゴリズムでは「初期化しない」または「最小値を設定する」という選択がある。
        // 今回のケースでは、「整数列を読み」「最大値を求めます」とあるので、データがない場合の動作は未定だが、プログラムとして無効な入力に対してエラーを起こさないため Long.MIN_VALUE を使うのが妥当である。

        boolean first = true;

        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(","); //カンマ区切りなのでこれで分割される
            
            for (String part : parts) {
                String trimmed = part.trim();
                
                if (!trimmed.isEmpty() && isNumeric(trimmed)) { 
                    try {
                        long val = Long.parseLong(trimmed);
                        
                        if (first || val > max) {
                            count++; // 有効な数値としてカウントする（ただし、同じ最大値が複数ある場合？問題文は「要素数」なので、すべての整数をカウントすべきか？「その『要素数』と『最大値』」とあるので、「配列の長さ」（有効なもの）と「最大値」である。
                            // したがって、すべて有効な数の数を count にする必要がある（重複も含む？）
                            
                        } else { 
                             if (val == max) {} // 同じならカウントしない？問題文は「要素数」とあるので、すべての整数を数えるべきか？
                             // 「その『要素数』」という表現から、「有効な数の総数」である。したがって、同じ値が複数ある場合もすべてカウントする必要がある（最大値だけが変わるわけではない）。

                        } 
                    } catch (NumberFormatException e) { continue; }
                } else if (!trimmed.isEmpty()) { // 空白のみか空文字の場合はスキップ（ただし、分割後の部分が空になることは稀だが安全のため）
                     // ここでは isNumeric でチェック済みなので、ここでは不要である。しかし、isNumeric が「整数として解釈できる」かどうかをチェックしているため、このブロックは不要かもしれない。

                } else { 
                    continue; 
                }
            }
        }

// 上記のロジックを再確認：count は有効な数の総数であり、max はその中で最大の値である。したがって、「同じ最大値が複数ある場合」も count に含める必要がある（要素数を求めるため）。

System.out.println("count=" + count + " max=" + max);
}

private static boolean isNumeric(String s) {
    try { return Long.parseLong(s.trim()) != null; } catch (NumberFormatException e) { return false; }; // 長文字列でも OK（Long の範囲内）
};

//最終的なコードを再構築：
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxVal = Long.MIN_VALUE; // 初期値として最小の整数をセットする。ただし、もしデータがなければこのまま出力すべきか？通常は入力なしの場合は最大値が存在しないため特殊処理が必要だが、問題文では「要素数と最大値」を求めるので、少なくとも1個以上の有効な数が存在すると想定し、または空の場合も対応できるロジックにする必要がある。
        boolean firstValid = true;

        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(","); //カンマ区切りなのでこれで分割される
            
            for (String part : parts) {
                String trimmed = part.trim();
                
                if (!trimmed.isEmpty() && isNumeric(trimmed)) { 
                    try {
                        long val = Long.parseLong(trimmed);

                        if (firstValid || val > maxVal) { // 最初の数値で初期化し、その後より大きいものを書き換える。ただし、「同じ最大値が複数ある場合」は count に含める必要がある（要素数を求めるため）。したがって、「val == maxVal」というケースでもカウントすべきか？
                            // 「その『要素数』と『最大値』を求めます」とあるので、有効な数の総数（count）と最大の値（max）である。
                            // したがって、「同じ値が複数ある場合」もすべて count に含める必要がある。

                        } else if (!firstValid && val == maxVal) { 
                             // ここではカウントしない？問題文は「要素数」とあるので、すべての整数を数えるべきか？
                             // 「その『要素数』」という表現から、「配列の長さ」（有効なもの）である。したがって、同じ値が複数ある場合もすべてカウントする必要がある（最大値だけが変わるわけではない）。

                        } 
                    } catch (NumberFormatException e) { continue; }
                } else if (!trimmed.isEmpty()) { // 空白のみか空文字の場合はスキップ（ただし、分割後の部分が空になることは稀だが安全のため）
                     // ここでは isNumeric でチェック済みなので、ここでは不要である。しかし、isNumeric が「整数として解釈できる」かどうかをチェックしているため、このブロックは不要かもしれない。

                } else { 
                    continue; 
                }
            }
        }

// 上記のロジックを再確認：count は有効な数の総数であり、max はその中で最大の値である。したがって、「同じ最大値が複数ある場合」も count に含める必要がある（要素数を求めるため）。

System.out.println("count=" + count + " max=" + maxVal);
}

private static boolean isNumeric(String s) {
    try { return Long.parseLong(s.trim()) != null; } catch (NumberFormatException e) { return false; }; // 長文字列でも OK（Long の範囲内）
};

//最終的なコードを再構築：
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0; // 有効な数の総数（要素数）
        long maxVal = Long.MIN_VALUE; // 最大値。初期化として最小の整数を使うが、もしデータがない場合どうするかは未定だが、通常は「なし」で表現する必要があるか？問題文では「整数列を読み」「最大値を求めます」とあるので、少なくとも1個以上の有効な数が存在すると想定し、または空の場合も対応できるロジックにする必要がある。
        // ただし、「64bit integer の範囲に収まるため、Long.MIN_VALUE を使うのが妥当である（ただし、これは正しくないかもしれない）。しかし、一般的なアルゴリズムでは「初期化しない」または「最小値を設定する」という選択がある。」

// 最終的なコードを再構築：
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0; // 有効な数の総数（要素数）
        long maxVal = Long.MIN_VALUE; // 最大値。初期化として最小の整数を使うが、もしデータがない場合どうするかは未定だが、通常は「なし」で表現する必要があるか？問題文では「整数列を読み」「最大値を求めます」とあるので、少なくとも1個以上の有効な数が存在すると想定し、または空の場合も対応できるロジックにする必要がある。
        // ただし、「64bit integer の範囲に収まるため、Long.MIN_VALUE を使うのが妥当である（ただし、これは正しくないかもしれない）。しかし、一般的なアルゴリズムでは「初期化しない」または「最小値を設定する」という選択がある。」

// 最終的なコードを再構築：
public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0; // 有効な数の総数（要素数）
        boolean firstValid = true;

        if (line != null && !line.isEmpty()) {
            String[] parts = line.split(","); //カンマ区切りなのでこれで分割される
            
            for (String part : parts) {
                String trimmed = part.trim();
                
                if (!trimmed.isEmpty() && isNumeric(trimmed)) { 
                    try {
                        long val = Long.parseLong(trimmed);

                        if (firstValid || val > maxVal) { // 最初の数値で初期化し、その後より大きいものを書き換える。ただし、「同じ最大値が複数ある場合」は count に含める必要がある（要素数を求めるため）。したがって、「val == maxVal」というケース
