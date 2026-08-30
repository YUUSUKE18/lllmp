```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        int maxVal = Integer.MIN_VALUE; // デフォルトは最小値。空でない場合のみ更新するロジックが必要だが、初期化を慎重にする必要があるため、まずは「存在するか」を確認してリセットする方法や、最初の要素があるかチェックする処理を入れる
    
    if (line != null) {
        StringTokenizer st = new StringTokenizer(line);
        boolean exists = false; // 有効な整数が入力されているかどうか

        while (!st.hasMoreTokens()) {
            break; 
        }
        
        maxVal = Long.MIN_VALUE;
        count = 0; 
        
        if (exists) {} // ここでは、まずは初期値に注意が必要だが、Java の int や long は演算子を考慮して扱いやすくなっているため、以下のコードで処理する。

    try:
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                try {
                    long n = Long.parseLong(token); // 64bit integer を扱うには long か int で良いが問題文は 'int' とあるか？「値は 64bit 整数の範囲に収まる」→long にする。
                    
                    if (!exists) exists = true;

                } catch (NumberFormatException e) { /* 無視 */ } // これはエラーをキャッチし続ける必要があるが、try-catch でラップしてループを進めるのが正しいか？いや、Integer.parseInt は例外を出すのでその部分を囲む。
                
            if (!exists && n > maxVal || exists && n >= (long)maxVal) { 
                // 最初の要素がある場合のみ処理し直す。あるいは、存在しない場合は初期値が問題になる可能性があるため、最初に有効な数がないか判断するのが良い。

    } catch(Exception e){}
        count = Integer.parseInt(st.nextToken());
    
    System.out.println("count=" + count);
