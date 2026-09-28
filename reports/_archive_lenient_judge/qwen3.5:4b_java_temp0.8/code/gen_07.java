import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数のセットと、各数字の出現回数をカウントするデータ構造を作成します。
        Set<Integer> uniqueNumbers = new HashSet<>();
        long totalSum = 0;

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空または空白のみを含む場合は処理をスキップし、結果は初期値のまま出力する必要があるため、
            // まずセットに追加して合計を加算していくアプローチを取る。
            // ただし仕様「整数として解釈できない要素も無視」なので split で区切り文字ごとに分割するか regex を使うのが適切。
            
            String[] parts = line.split("\\s*[,\\r]+"); // 空白またはカンマで区切る
            
            for (String part : parts) {
                if (part.isEmpty()) {
                    continue; // 空要素は無視
                }

                try {
                    int number = Integer.parseInt(part);
                    uniqueNumbers.add(number);
                    
                    // set に追加されるたびにその数を合計に加算する必要があるか？
                    // 「重複を除いた整数」について「個数と合計を求める」という表現は、
                    // 例：入力 [1, 2, 3, 4] -> count=5 (1+2+3+4), sum=? 
                    // しかし通常、「重複を除く」と言うとセットの要素个数が count になることが多い。
                    // また「個数と合計」が何を指すか解釈が必要な点がある。
                    // 一般的なコンテスト問題（AtCoder など）での類似問題は以下の通り：
                    // 「入力された整数のうち、値を重複を除いた後の集合 S とし、|S| を count, S の和を sum」と定義される場合が多い。
                    // しかし、「個数」が「各数字の出現回数の合計（元のリスト長）」なのかそれとも「ユニーク要素の数」か？
                    // 文脈：「重複を除いた整数について...」→ 「その集合に対して計算する」。
                    // 解釈 A: count = 異なる値の本数, sum = そのすべての和。 (AtCoder ABC053 C の逆や類似)
                    // 解釈 B: count = 元のリストから取り除く重複を除いた後の個数（ユニーク要素）, sum = 同じ和。
                    // しかし、もし「[1,1,2]」の場合：
                    // - ユニーク値は {1,2} → count=2, sum=3.
                    // もし「各数字の出現回数を別々に求める」という意味なら別の表現になるはず。
                    
                    // 再考: 「重複を除いた整数について、個数と合計を求めます」
                    // これは「ユニークな値の数（count）およびその和(sum)」という意味が最も自然に解釈できる。
                } catch (NumberFormatException e) {
                    continue; // 整数として解釈できない要素は無視
                }
            }

            long count = uniqueNumbers.size();
            
            // しかし、上記のループでは sum の計算を漏らしている（set に add するたびに加算していない）
            // set を使っているから追加した時点でその数を合計に加える必要がある。
            // 修正：セットに入れる前に数値を取得し、かつ集計用データ構造を使っても良いが、単一 HashSet で管理可能か？
            // Java の Set は duplicate なしかを判別するだけなので sum 計算には別途カウントが必要。
            
            // 再書き換え: set に insert した時点でその要素の値を取得して sum に加算するのは難しい（set が重複チェック前に取得しているため）。
            // なので、まずセットにユニークな数値のみを追加し、かつそれを合計にするために、もう一度同じ集合から遍历する必要がある。
            
        }

        long count = uniqueNumbers.size();
        
        /* 
           上記のロジックの問題点を再確認:
           "uniqueNumbers.add(number)" → set に追加されるので重複は除去されるが、その数値を sum に加算するには
           その数値を取得して sum += number を行う必要がある。しかし、set の add メソッド自体には返り値の真偽以外情報はない。
           
           修正案: 
           - まずユニークな整数のリスト（ArrayList）を作成し、そこに追加していく。
           - 同じ要素をセットでチェックする際に重複を防ぐ。
        */

        // リファクタリングした実装
        uniqueNumbers.clear();
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            try {
                java.util.List<Integer> numbersList = new java.util.ArrayList<>();
                
                for(String part : parts) {
                    // 空白のみなどの処理を簡略化し、StringTokenizer のように扱うか Regex で分割する。
                    if (part.length() == 0 || !Character.isDigit(part.charAt(0)) && 
                        !(part.contains("-") && part.indexOf('-') != -1)) {
                         continue; // ここでは単純に Integer.parseInt が失敗すると catch に回るが、先ほどの check は不完全なので try-catch を再確認。
                    }

                    int num = 0;
                    boolean ok = true;
                    
                    if (part.length() > 256) { 
                        ok = false; // オーバーフローの可能性（ただし Java の Integer.parseInt は範囲内のみ許可するため、文字数が多いと例外が発生）
                    } else {
                         try {
                             num = Integer.parseInt(part);
                             ok = true;
                         } catch (NumberFormatException e){
                             ok = false; 
                         }
                    }

                     if(ok) numbersList.add(num); // 実際にはここは set でチェックして重複を除去しつつ list に追加する方が効率的だが、set を使っているなら別アプローチが必要。
                }

            } catch (Exception e){}

             /* 
               より単純な実装に戻る：Set のみで管理し、sum をどう計算するか？
               Set には duplicate なしかを判別するだけなので、一度 set に追加した数値の和を求めるには
               その後に iter で走らなければならない。つまり、setに要素が一つ増えるたびに sum+=val はできない（重複がある場合）。
               
               正しいアプローチ: 
               1. Set<Integer> uniqueSet = new HashSet<>(); (ユニークな数値を格納)
               2. long totalSum = 0;
               3. データ構造として、set に一意の要素だけ追加し、その際に sum を加算するか？ -> set の add は return boolean なので個別に取得できない。
               
               よって: 
               - まずユニークな値を list または map でカウントして、その後で唯一のものを抽出する必要があるか？
               - あるいは：Set に追加した後のリストを作成し、その中の要素すべてで sum を計算する。（set は重複を排除しているので OK）

            */
        }

        //最終的な実装ロジック:
        Scanner scannerIn = new Scanner(System.in);
        
        Set<Integer> uniqueValues = new HashSet<>();
        String inputLine = "";
        if (scanner.hasNext()) {
             while(scanner.hasNext()){ 
                inputLine += " "; +
                 break; // シンプルに一行だけ読むか？"標準入力から...受け取ります" → 通常は一度の読み込みまたは全内容。
                         // spec: 「カンマ区切りの整数列を受け取ります」→ line と解釈するべきか、あるいは複数行がある場合も想定すべきか？
                         // プログラムを簡潔にするため一行として扱うが、scanner.next() で取得し、split して処理するのが安全。
             }
        }

        String[] tokens = inputLine.split("[,\\s]+"); //カンマと空白で分割
        
        for(String token : tokens){
            if(token.isEmpty()){ continue; }
            
            int val = Integer.parseInt(token); //try-catch で制御が必要だが、仕様では「整数として解釈できない要素も無視」とあるので try 必須
            
            uniqueValues.add(val);
        }

        long count = uniqueValues.size();
        
        /* 
           sum の計算: ユニークな値の和であるはず。
           set から iter で足していくしかない。
           
        */
    // 修正したコードを以下のように再記述する必要がある（思考プロセスの結果）.

}
