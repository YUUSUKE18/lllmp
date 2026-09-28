import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int target = Integer.parseInt(br.readLine());
        List<String> lines = br.lines().skip(1).collect(Collectors.toList());
        HashMap<Integer, Integer> countMap = new HashMap<>();
        int pairs = 0;
        for (String line : lines) {
            List<Integer> nums = line.trim().split("\\s+").stream()
                    .filter(n -> n.isEmpty() == false)
                    .map(Integer::parseInt)
                    .collect(Collectors.toList());
            for (int i = 0; i < nums.size(); i++) {
                for (int j = i + 1; j < nums.size(); j++) {
                    if (nums.get(i) + nums.get(j) == target) {
                        pairs++;
                    }
                }
            }
            for (int num : nums) {
                if (countMap.containsKey(num)) {
                    countMap.put(num, countMap.get(num) + 1);
                } else {
                    countMap.put(num, 1);
                }
            }
        }
        System.out.println("pairs=" + pairs);
    }
}
