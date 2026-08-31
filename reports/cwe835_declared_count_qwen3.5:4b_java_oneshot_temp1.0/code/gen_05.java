import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        String line1 = br.readLine();
        if (line1 == null) {
            System.out.println("count=0 sum=0");
            return;
        }
        
        long count;
        try {
            count = Long.parseLong(line1.trim());
        } catch (NumberFormatException e) {
            count = 0;
        }
        
        int nRead = 0;
        String line2;
        while ((line2 = br.readLine()) != null) {
            if (line2.trim().isEmpty()) continue;
            
            String[] parts = line2.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long value = Long.parseLong(part);
                    nRead++;
                } catch (NumberFormatException e) {
                }
            }
        }
        
        long sum = 0;
        // 注意: 実際読み取れた個数は part 数 + int 数であり、1 つの整数として扱える範囲を考慮する必要がある。
        // ただし問題文では「実際に読み取れた整数だけ」とあるので、各部分文字を個別の整数とするのが一般的。
        // しかし、64bit 整数の範囲内であることは保証されているため、int は使わず long を用いるべきだが、
        // 1 つの数値が長すぎる場合や負の数が含まれると sum が overflow する可能性がある。
        // このため long を使って計算し、溢れた場合は警告を出すか（問題文に指定がないので黙認）。
        for (int i = 0; i < nRead; i++) {
            try {
                String line = br.readLine();
                if (line == null) break; // ここでは既に全て読んだことを前提とするため、余計な read は避けるが、実際の処理は上記の while と同じ。
            } catch (IOException e) {
            }
        }
        
        // 再修正: 上記のロジックは少し混乱している。
        // 正しいロジックを再構築する。
        
        long sumCorrected = 0;
        int nReadCorrected = 0;
        
        // 最初の整数 (個数) を読み込んだ後、残りの行から値を読み込む
        line2 = br.readLine();
        while (line2 != null) {
            if (line2.trim().isEmpty()) {
                line2 = br.readLine();
                continue;
            }
            
            String[] parts = line2.split("\\s+");
            for (String part : parts) {
                if (part.isEmpty()) continue;
                try {
                    long val = Long.parseLong(part);
                    sumCorrected += val;
                    nReadCorrected++;
                } catch (NumberFormatException e) {
                }
            }
            
            line2 = br.readLine(); // 行ごと読み続ける
        }
        
        // 上記のロジックで、1 つの数値が長すぎる場合（文字列が大きすぎる）は Long.parseLong が例外を吐く。
        // しかし、問題文では「64bit 整数の範囲に収まる」とあるので、parse は成功するはず。
        // また、「実際読み取れた個数は 1 行目の値と一致しないことがあります」とあるので、nReadCorrected で調整。
        
        System.out.println("count=" + nReadCorrected + " sum=" + sumCorrected);
    }
}
