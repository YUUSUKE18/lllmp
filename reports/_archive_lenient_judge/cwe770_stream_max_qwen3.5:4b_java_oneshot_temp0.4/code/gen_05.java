import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        StringTokenizer st = null;
        if (line != null && !line.isEmpty()) {
            //カンマ区切りなので、まず文字列を分割する必要があるが、StringTokenizer は空白区切りに最適化されているため、
            // 手動で「,」の位置を探して取得するか、または単純に split("，") を使う。
            // ただし Java の String.split で特殊文字（カンマ）を使うとエスケープが必要だが、ここでは安全に行う。
            
            st = new StringTokenizer(line); 
            int count = 0;
            long maxVal = Long.MIN_VALUE;
            boolean first = true;

            while (st.hasMoreTokens()) {
                String token = st.nextToken(); //空白区切りで取得したが、入力形式は「整数，整数」なのでこの方法では失敗する可能性がある。
                //再考：StringTokenizer は空白をデフォルトの分割子として扱うため、「1, 2 ,3」という入力を渡すと「1»,»2»], »3】が得られるわけではない（カンマは無視される）。
                //したがって、split を使うのが正確。ただし split("，") の場合、文字列内の特殊文字をエスケープする必要があるか？ 
                // Java 8 では "，" はそのまま使える。

            }
        } else {
             System.out.println("count=0 max=" + Long.MIN_VALUE);
             return;
        }

        String[] parts = line.split(",");
        
        long currentMax = Long.MIN_VALUE;
        int count = 0;
        boolean first = true; //最初の値を処理したかどうかのフラグ（初期化は必要だが、Long.MIN_VALUE は最小なので最初から更新されるか確認が必要）

        for (int i = 0; i < parts.length; i++) {
            String part = parts[i].trim();
            if (!part.isEmpty()) { //空要素をスキップ
                try {
                    long val = Long.parseLong(part);
                    
                    //最初の値が処理されていない場合（またはより大きい値）に更新するロジック。
                    //ただし、Long.MIN_VALUE が最小なので、最初に入力された有効な整数で max を初期化するのが安全。
                    if (first || val > currentMax) { 
                        currentMax = val;
                        first = false;
                    } else if (!first && val < 0L) { //負の値も比較対象として扱う必要があるか？
                         //仕様は「最大値」なので、最初の有効な整数が max の初期化になるべき。
                         //Long.MIN_VALUE は最小値なので、最初に入力された数で更新されるはず。
                    } 
                } catch (NumberFormatException e) {
                    //無効な要素は無視（既にスキップ済みだが、例外をキャッチして処理しない）
                }
            } else {
                 continue; //空文字列はスキップ
            }

        }
        
        System.out.println("count=" + count); 
    }
}
