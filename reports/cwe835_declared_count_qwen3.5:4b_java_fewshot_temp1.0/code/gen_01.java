import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // 1 行目に整数の個数を読み込む（空行などを無視する必要があるが、仕様は"1 行目"と明確なので単純に readLine）
        String lineCountLine = br.readLine();
        if (lineCountLine == null || lineCountLine.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        int expectedCount = 0;
        try {
            // 空白区切りで整数を解析（念のため split("\\s+") を使用）
            String[] parts = lineCountLine.trim().split("\\s+");
            for (String p : parts) {
                if (!p.isEmpty()) {
                    expectedCount = Integer.parseInt(p);
                    break; // 最初の有効な整数を使用
                }
            }
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long count = 0;
        long sum = 0;

        while (true) {
            String line = br.readLine();
            if (line == null) break;

            // 空白がなければスキップ（空行やスペースだけの行は整数でないとして無視）
            if (line.trim().isEmpty()) continue;

            // 各行に少なくとも 1 つの整数があることを期待するが、複数あった場合でも「実際に読み取れた整数だけ」対象とするため
            // 各行を空白で分割して解析し、成功した数だけをカウントと合計に加算
            try {
                String[] nums = line.trim().split("\\s+");
                for (String num : nums) {
                    if (!num.isEmpty()) {
                        long val = Long.parseLong(num);
                        count++;
                        sum += val;
                    }
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合、その行はスキップ
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
